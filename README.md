# GhostGab — Practice Chat Overlay

**Because streaming should be fun, with 100 viewers or one.**

GhostGab is a browser-based, OBS-ready practice chat overlay for beginner and
small streamers. It helps creators fill dead air, practice talking to chat, and
feel less lonely when streaming to 0–5 viewers.

## Features

- Simulated stream chat with distinct viewer personalities
- Opening → normal stream phases with greetings
- Streamer profile so chatters reference you by name
- Game selection (franchise + sub-game) with OBS-clickable buttons
- Adjustable message frequency and a viewer-count simulator
- Optional chatter-to-chatter interactions
- Transparent OBS overlay mode with auto-start support

## Usage

Open `index.html` in a browser, set up your chat in the controls panel, and
press **Start Chat**.

### OBS Browser Source

Add a Browser Source pointing at:

```
index.html?obs=true&autostart=true
```

This launches GhostGab directly into a transparent overlay with chat already
running. Press `Esc` (or the **Exit OBS** button) to return to the normal view.

## Links

- Website: [GhostGab.app](https://ghostgab.app)
