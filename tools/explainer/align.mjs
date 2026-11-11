import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
const key = process.env.ELEVENLABS_API_KEY || execSync(`powershell -NoProfile -Command "[Environment]::GetEnvironmentVariable('ELEVENLABS_API_KEY','User')"`).toString().trim();
const [mp3, out] = process.argv.slice(2);
const lines = JSON.parse(readFileSync("lines.json"));
const text = lines.map((l) => l[1]).join(" ");
const fd = new FormData();
fd.append("file", new Blob([readFileSync(mp3)], { type: "audio/mpeg" }), "voice.mp3");
fd.append("text", text);
const r = await fetch("https://api.elevenlabs.io/v1/forced-alignment", { method: "POST", headers: { "xi-api-key": key }, body: fd });
if (!r.ok) { console.log("ERR", r.status, (await r.text()).slice(0, 300)); process.exit(1); }
const j = await r.json();
const words = j.words.filter((w) => w.text.trim()).map((w) => ({ w: w.text.trim(), s: +w.start.toFixed(2), e: +w.end.toFixed(2) }));
writeFileSync(out, JSON.stringify(words));
console.log(words.length, "words; first", words.slice(0, 4), "last", words.at(-1));
