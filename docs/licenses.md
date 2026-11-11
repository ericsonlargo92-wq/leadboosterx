# Media licenses

Every third-party file used on the site, where it came from, and its license. Added 2026-11-11.

## Explainer B-roll (`public/broll/`)

Pixabay Content License: free for commercial use, no attribution required. Clips were trimmed, resized to 960×540 and re-encoded. No clip shows a recognizable logo or trademark.

| File | Source | License |
| --- | --- | --- |
| `public/broll/01-hook.mp4` | [Pixabay video 202987](https://pixabay.com/videos/id-202987/) | Pixabay Content License |
| `public/broll/02-night.mp4` | [Pixabay video 63973](https://pixabay.com/videos/id-63973/) | Pixabay Content License |
| `public/broll/03-clock.mp4` | [Pixabay video 8897](https://pixabay.com/videos/id-8897/) | Pixabay Content License |
| `public/broll/04-sleep.mp4` | [Pixabay video 729](https://pixabay.com/videos/id-729/) | Pixabay Content License |
| `public/broll/05-phone.mp4` | [Pixabay video 204527](https://pixabay.com/videos/id-204527/) | Pixabay Content License |
| `public/broll/06-empty-room.mp4` | [Pixabay video 1191](https://pixabay.com/videos/id-1191/) | Pixabay Content License |
| `public/broll/07-system.mp4` | [Pixabay video 172529](https://pixabay.com/videos/id-172529/) | Pixabay Content License |
| `public/broll/08-scroll.mp4` | [Pixabay video 169445](https://pixabay.com/videos/id-169445/) | Pixabay Content License |
| `public/broll/09-funnel.mp4` | [Pixabay video 369817](https://pixabay.com/videos/id-369817/) | Pixabay Content License |
| `public/broll/10-reply.mp4` | [Pixabay video 348444](https://pixabay.com/videos/id-348444/) | Pixabay Content License |
| `public/broll/11-booking.mp4` | [Pixabay video 39892](https://pixabay.com/videos/id-39892/) | Pixabay Content License |
| `public/broll/12-coaching.mp4` | [Pixabay video 137265](https://pixabay.com/videos/id-137265/) | Pixabay Content License |
| `public/broll/13-contractor.mp4` | [Pixabay video 67460](https://pixabay.com/videos/id-67460/) | Pixabay Content License |
| `public/broll/14-plan.mp4` | [Pixabay video 137260](https://pixabay.com/videos/id-137260/) | Pixabay Content License |
| `public/broll/15-build.mp4` | [Pixabay video 137263](https://pixabay.com/videos/id-137263/) | Pixabay Content License |
| `public/broll/16-handshake.mp4` | [Pixabay video 358512](https://pixabay.com/videos/id-358512/) | Pixabay Content License |
| `public/broll/17-calm.mp4` | [Pixabay video 203260](https://pixabay.com/videos/id-203260/) | Pixabay Content License |

## Explainer soundtrack (`public/audio/explainer-mix.mp3`)

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
