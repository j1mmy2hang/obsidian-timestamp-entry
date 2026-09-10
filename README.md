# Timestamp Entry

An Obsidian plugin that does one thing: start a new timestamped log entry.

One command, **Insert timestamp entry**:

1. Moves the cursor to a blank line exactly one blank line below the last line of content above it, creating the lines it needs.
2. Writes `**07:14** — ` there and leaves the cursor after it.

```
**07:09** — woke up early
                            ← cursor lands here, one blank line down
**07:22** — |
```

It never overwrites or deletes anything. If content sits directly below, it is pushed down to make room.

## Install

**With [BRAT](https://github.com/TfTHacker/obsidian42-brat)** — works on desktop and mobile:

1. Install BRAT from the community plugin store.
2. BRAT settings → **Add beta plugin** → `j1mmy2hang/obsidian-timestamp-entry`.
3. Enable **Timestamp Entry** under Community plugins.

**Manually:** copy `main.js` and `manifest.json` into `<vault>/.obsidian/plugins/timestamp-entry/` and reload.

## Use it

Bind a hotkey under Settings → Hotkeys (search "timestamp"); nothing is bound by default.

On mobile, add the command to the toolbar (Settings → Toolbar) — that keeps the keyboard up, which the ribbon does not.

## License

MIT
