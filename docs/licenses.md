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

## Project media: freight quote capture demo (2026-11-24)

| File | Source | License |
| --- | --- | --- |
| `public/projects/northline-freight-loop.mp4` (silent), `northline-freight-voiceover.mp4`, `northline-freight-poster.webp` | Screen recording of the Northline Freight demo site (fictional brand) built by Ericson in GoHighLevel AI Studio. Hero clip: [Pixabay video 384064](https://pixabay.com/videos/id-384064/) (AI-generated, no logos). Voiceover: ElevenLabs premade "Eric". Music: ["Hopeful"](https://pixabay.com/music/beats-hopeful-614905/) (Pixabay track 614905), about 14 dB under the voice | Own work; Pixabay Content License; ElevenLabs terms for the account's plan |

## Project media: upholstery and tree service demos (2026-11-24)

| File | Source | License |
| --- | --- | --- |
| `public/projects/ridgeway-upholstery-{loop,voiceover}.mp4`, `-poster.webp` | Screen recording of the Ridgeway Upholstery demo (fictional brand) built in GoHighLevel AI Studio; images generated or royalty-free from AI Studio | Own work |
| `public/projects/timberline-tree-care-{loop,voiceover}.mp4`, `-poster.webp` | Screen recording of the Timberline Tree Care demo (fictional brand). Photos: Pixabay 5831756, 4567686, 843732 | Own work; Pixabay Content License |
| Voiceovers on both | ElevenLabs premade "Eric"; music "Hopeful" (Pixabay 614905) about 14 dB under the voice | ElevenLabs terms; Pixabay Content License |

## Project media: Nurture and Close workflow screenshots (2026-11-24)

- `public/projects/{freight,upholstery,tree}-{nurture,close}-workflow.webp`: own screenshots of the six demo workflows in the
  GoHighLevel workflow builder (demo sub-account, drafts), captured at 100% zoom in overlapping strips and stitched. Canvas
  area only (no account name, avatar or ids). No third-party content.
- `public/projects/{freight,upholstery,tree}-{nurture,close}-workflow-voiceover-v2.mp4` (+ `-poster.webp`): animated, narrated
  walkthroughs of the six workflows (camera follows the narration, pointer taps each step, step label, simple captions). Voice: the owner's own cloned ElevenLabs voice ("Ericson"). Music: custom track generated with
  ElevenLabs Music (2026-11-24), about 14 dB under the voice.
- `public/projects/{northline-freight,ridgeway-upholstery,timberline-tree-care}-voiceover-v2.mp4`: the website recordings
  re-voiced in the owner's "Ericson" voice with the same ElevenLabs Music track (replaces the earlier `-voiceover.mp4` files). All three are now `-voiceover-v3.mp4`: the last line "Built by LeadBoosterX." was replaced with the call to action
  "If you want one like this, book your free call." (Ericson voice, steadier settings, pitch lowered about 4.5%).

## Explainer soundtrack (`public/audio/explainer-ghl-v3.mp3`, 57.34 s)

| Part | Source | License |
| --- | --- | --- |
| Voiceover | The owner's own cloned ElevenLabs voice "Ericson" (`o2msbrh3ncbn7eB9dWrN`), one take of the 12-line script with the previous version's pauses between lines re-inserted | ElevenLabs terms for the account's plan |
| Music | Custom 62 s instrumental generated with ElevenLabs Music (soft piano, plucked guitar, light percussion, warm pads), about 14 dB under the voice | ElevenLabs terms for the account's plan |
| Sound effects | Self-made LBX sound set (`Personal Brand - Content/assets/sfx/lbx_*.wav`) | Own work |

## Rebuilding the explainer

Use the Claude skill `website-explainer-video` (copy in the handover package, `tools/website-explainer-video-skill/`).
API keys are read from Windows user environment variables (`ELEVENLABS_API_KEY`, `PIXABAY_API_KEY`), never stored in files.

1. Script: `tools/explainer/lines.json` (id, spoken text, display text). Voice: the owner's ElevenLabs voice "Ericson"
   (`o2msbrh3ncbn7eB9dWrN`), eleven_multilingual_v2, stability 0.5, style 0.25, speed 1.0 (skill `tts.mjs`). That voice leaves almost
   no gap between lines, so silence is inserted after each line to match the previous take's pacing (about 8 s in total).
2. Word timings: skill `align.mjs`, then `timeline.py` writes `src/data/explainer-cues.json` and `src/data/explainer-words.json`.
3. Sound effects on visual beats: `tools/explainer/events.json` (names from the LBX `sfx.json`).
4. Mix: skill `mix.mjs --music <ElevenLabs track> --music-gain 0.2 --total 57.34` → music about 14 dB under the voice; then
   ffmpeg `loudnorm=I=-16` at 128 kbps. B-roll cuts and sound effects were shifted to the new line timings (piecewise-linear map).
5. **Save the mix under a new file name** (next: `explainer-ghl-v4.mp3`) and update `src` in `src/components/Explainer.tsx`:
   `/audio/*` is cached for a week, so reusing a name can pair an old soundtrack with new timings for returning visitors.

History: the 2026-11-24 edit (no 14-day promise) regenerated only the `promise` line and spliced it into the existing voiceover
(ffmpeg: keep 0–40.66 s, insert the new 4.2 s line at −1.5 dB, keep 47.2 s → end), then re-aligned and re-mixed.
