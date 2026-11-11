// Generates the explainer voiceover with ElevenLabs and per-line timings. Key read from the Windows user env var.
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
const key = process.env.ELEVENLABS_API_KEY || execSync(`powershell -NoProfile -Command "[Environment]::GetEnvironmentVariable('ELEVENLABS_API_KEY','User')"`).toString().trim();
if (!key) throw new Error("no key");
const [outMp3, outJson] = process.argv.slice(2);
const lines = JSON.parse(readFileSync(new URL("./lines.json", import.meta.url)));
const VOICE = "cjVigY5qzO86Huf0OWal"; // "Eric" premade: smooth, friendly American male
const text = lines.map((l) => l[1]).join(" ");
const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}/with-timestamps?output_format=mp3_44100_128`, {
  method: "POST",
  headers: { "xi-api-key": key, "Content-Type": "application/json" },
  body: JSON.stringify({
    text,
    model_id: "eleven_multilingual_v2",
    voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.25, use_speaker_boost: true, speed: 1.0 },
  }),
});
if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
const j = await res.json();
writeFileSync(outMp3, Buffer.from(j.audio_base64, "base64"));
const a = j.alignment;
let pos = 0;
const cues = lines.map(([id, spoken, display]) => {
  const start = text.indexOf(spoken, pos);
  const end = start + spoken.length - 1;
  pos = end + 1;
  return { id, text: display, start: +a.character_start_times_seconds[start].toFixed(2), end: +a.character_end_times_seconds[end].toFixed(2) };
});
const total = a.character_end_times_seconds.at(-1);
writeFileSync(outJson, JSON.stringify({ total: +total.toFixed(2), cues }, null, 2));
console.log("total", total.toFixed(2), "s");
for (const c of cues) console.log(c.start.toFixed(2).padStart(6), c.end.toFixed(2).padStart(6), c.id);
