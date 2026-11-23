# Media licenses

Every third-party file used on the site, where it came from, and its license. Added 2026-11-11.

## Explainer B-roll (`public/broll/`, GoHighLevel explainer, 2026-11-24)

Pixabay Content License: free for commercial use, no attribution required. Clips were trimmed, resized to 960x540 and re-encoded (same sources as the first explainer, re-cut to the new script). No clip shows a recognizable logo or trademark.

| File | Source | License |
| --- | --- | --- |
| `public/broll/g01-hook.mp4` | [Pixabay video 202987](https://pixabay.com/videos/id-202987/) | Pixabay Content License |
| `public/broll/g02-three.mp4` | [Pixabay video 63973](https://pixabay.com/videos/id-63973/) | Pixabay Content License |
| `public/broll/g03-capture-ads.mp4` | [Pixabay video 169445](https://pixabay.com/videos/id-169445/) | Pixabay Content License |
| `public/broll/g04-capture-msgs.mp4` | [Pixabay video 204527](https://pixabay.com/videos/id-204527/) | Pixabay Content License |
| `public/broll/g05-nurture-clock.mp4` | [Pixabay video 8897](https://pixabay.com/videos/id-8897/) | Pixabay Content License |
| `public/broll/g06-nurture-cold.mp4` | [Pixabay video 729](https://pixabay.com/videos/id-729/) | Pixabay Content License |
| `public/broll/g07-close-empty.mp4` | [Pixabay video 1191](https://pixabay.com/videos/id-1191/) | Pixabay Content License |
| `public/broll/g08-system.mp4` | [Pixabay video 172529](https://pixabay.com/videos/id-172529/) | Pixabay Content License |
| `public/broll/g09-captured.mp4` | [Pixabay video 369817](https://pixabay.com/videos/id-369817/) | Pixabay Content License |
| `public/broll/g10-nurtured.mp4` | [Pixabay video 348444](https://pixabay.com/videos/id-348444/) | Pixabay Content License |
| `public/broll/g11-booked.mp4` | [Pixabay video 39892](https://pixabay.com/videos/id-39892/) | Pixabay Content License |
| `public/broll/g12-plan.mp4` | [Pixabay video 137260](https://pixabay.com/videos/id-137260/) | Pixabay Content License |
| `public/broll/g13-build.mp4` | [Pixabay video 137263](https://pixabay.com/videos/id-137263/) | Pixabay Content License |
| `public/broll/g14-handshake.mp4` | [Pixabay video 358512](https://pixabay.com/videos/id-358512/) | Pixabay Content License |
| `public/broll/g15-calm.mp4` | [Pixabay video 203260](https://pixabay.com/videos/id-203260/) | Pixabay Content License |

## Explainer soundtrack (`public/audio/explainer-ghl.mp3`)

| Part | Source | License |
| --- | --- | --- |
| Voiceover | ElevenLabs text-to-speech, premade voice "Eric", generated with Ericson's ElevenLabs account | ElevenLabs terms for the account's plan |
| Music | ["Hopeful" on Pixabay Music](https://pixabay.com/music/beats-hopeful-614905/) (track 614905) | Pixabay Content License |
| Sound effects | Self-made LBX sound set (`Personal Brand - Content/assets/sfx/lbx_*.wav`) | Own work |

## Rebuilding the explainer

Scripts are in `tools/explainer/` (run from that folder; API keys are read from Windows user environment variables, never stored in files):

1. Edit `lines.json` (spoken text, display text).
2. `node tts.mjs <out.mp3> <cues.json>`: voice + line timings → copy cues to `src/data/explainer-cues.json`.
3. `node align.mjs <voice.mp3> <words.json>`: word timings for captions → regroup into `src/data/explainer-words.json`.
4. `node mix.mjs <voice.mp3> <music.mp3> <sfx-folder> public/audio/explainer-mix.mp3`: music ducked under the voice + sound effects.
