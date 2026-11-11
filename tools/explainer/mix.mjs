import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
const [voice, music, sfxDir, out] = process.argv.slice(2);
const cues = Object.fromEntries(JSON.parse(readFileSync("cues.json")).cues.map((c) => [c.id, c.start]));
const sc = (id) => cues[id] - 0.15; // scene start, same as the player
const ev = [
  ["pop", 0.75],
  ["whoosh", sc("gaps")], ["whoosh", sc("system")], ["whoosh", sc("coaches")], ["whoosh", sc("promise")], ["whoosh", sc("cta")],
  ["pop", cues.slow], ["pop", cues.silence], ["pop", cues.noshow],
  ["key", cues.slow + 3.6], ["key", cues.silence + 1.2], ["key", cues.noshow + 1.4],
  ["pop", cues.ads], ["line", cues.ads + 0.3], ["pop", cues.funnel], ["line", cues.funnel + 0.3], ["pop", cues.followup],
  ["key", cues.followup + 1.3], ["chime", cues.followup + 2.6], ["key", cues.followup + 3.7],
  ["pop", cues.home], ["key", cues.home + 0.6], ["key", cues.home + 1.1], ["key", cues.home + 1.6],
  ["chime", sc("promise") + 4.7], ["pop", cues.contract],
  ["shimmer", cues.cta],
];
const files = { pop: `${sfxDir}/lbx_pop_soft.wav`, key: `${sfxDir}/lbx_key_soft.wav`, line: `${sfxDir}/lbx_draw_line.wav`, chime: `${sfxDir}/lbx_chime_result.wav`, shimmer: `${sfxDir}/lbx_morph_shimmer.wav`, whoosh: `${sfxDir}/lbx_whoosh_low.wav` };
const gain = { pop: 0.5, key: 0.35, line: 0.4, chime: 0.45, shimmer: 0.45, whoosh: 0.5 };
const inputs = ["-i", voice, "-i", music];
const parts = [];
ev.forEach(([k, t], i) => {
  inputs.push("-i", files[k]);
  const ms = Math.max(0, Math.round(t * 1000));
  parts.push(`[${i + 2}:a]aformat=sample_rates=44100:channel_layouts=stereo,volume=${gain[k]},adelay=${ms}|${ms}[s${i}]`);
});
const TOTAL = 57.2;
const graph = [
  `[0:a]aformat=sample_rates=44100:channel_layouts=stereo,apad=pad_dur=2,asplit=2[v][vsc]`,
  // music: hopeful piano, quieter overall, ducked under the voice, rises in pauses, fades out at the end
  `[1:a]aformat=sample_rates=44100:channel_layouts=stereo,atrim=0:${TOTAL},volume=0.2,afade=t=in:d=1.2,afade=t=out:st=${TOTAL - 3}:d=3[m]`,
  `[m][vsc]sidechaincompress=threshold=0.02:ratio=5:attack=30:release=400:makeup=1[md]`,
  ...parts,
  `[v][md]${ev.map((_, i) => `[s${i}]`).join("")}amix=inputs=${ev.length + 2}:normalize=0:duration=first[mix]`,
  `[mix]atrim=0:${TOTAL},loudnorm=I=-16:TP=-1.5:LRA=11[out]`,
].join(";");
execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...inputs, "-filter_complex", graph, "-map", "[out]", "-ar", "44100", "-c:a", "libmp3lame", "-b:a", "128k", out]);
console.log("events", ev.length);
