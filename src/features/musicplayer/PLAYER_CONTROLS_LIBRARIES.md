# Music player controls — library recommendations

Reference for the control set shown in `src/assets/musicplayerscreen.jpg` and how to implement them in this Expo / React Native app.

---

## What the mock includes

| Area | Controls |
|---|---|
| Meta | Title, artist |
| Transport | Seek bar + elapsed / remaining time |
| Main | Previous · Play/Pause (large circle) · Next |
| Secondary | Shuffle · Repeat/queue · Like |
| Chrome | Header menu · bottom tabs (Home / Browse / Library) |

---

## Best library split

### 1. Playback engine (what actually plays audio)

**`react-native-track-player`** — best fit for this kind of app

- Queue, play/pause, next/prev, seek, shuffle/repeat modes
- Background play + lock screen / notification controls
- You wire the UI; it owns playback state

**Alternative:** `expo-audio` (or older `expo-av`) if you want something lighter and Expo-first. Track Player is stronger for a real music app.

---

### 2. Icons (match the mock look)

**`@expo/vector-icons`** (typical in Expo) — Ionicons / MaterialIcons cover:

- play / pause / skip
- shuffle / repeat
- heart
- home / search / library

No need for a separate “player UI” package just for glyphs.

---

### 3. Seek / progress slider

**No special player library required** for the bar in the mock.

- React Native’s `Slider` / a community slider, or a simple custom track + thumb
- Position and duration come from Track Player (or your audio API)

---

### 4. Bottom tabs

**Expo Router tabs** or **React Navigation bottom tabs**

- Home / Browse / Library as in the mock
- Navigation only — not part of the audio library

---

### 5. YouTube (if that’s the source)

YouTube is **not** Track Player’s sweet spot for “YouTube as the catalog.”

- Use **`react-native-youtube-iframe`** (or an official YouTube player embed) for YouTube playback
- Custom UI can mirror the mock, but YouTube’s rules limit full custom transport vs. your own audio files / licensed streams
- For a vinyl app that looks like the mock, **your own streams + Track Player** is cleaner than fighting YouTube’s player

---

## What you do *not* need

A single “Spotify clone UI kit” that paints the whole screen.

That mock is mostly **custom layout + icons + Track Player state**. Full themed player kits often fight a vinyl-specific design.

---

## Practical stack for those controls

| Need | Module |
|---|---|
| Play / pause / next / prev / seek / queue | **`react-native-track-player`** |
| Icons | **`@expo/vector-icons`** |
| Seek bar UI | RN slider or small custom control |
| Tabs | **Expo Router / React Navigation** |
| YouTube only | **`react-native-youtube-iframe`** (separate path) |

---

## Bottom line

Yes — library components exist for this control set.

**Best combo for the mock:** Track Player + Expo vector icons + your own layout (and normal tab navigation).

There isn’t one library that is “the vinyl player UI.” The **look** is custom; the **behavior** is Track Player (or YouTube iframe if you go that route).

---

## Related project notes

- Vinyl / player layout flex notes: `FLEX_BOTTOM_PLAYER.md`
- Mock image: `src/assets/musicplayerscreen.jpg`
- Current UI shell: `src/features/musicplayer/ui/Player.jsx`, `VinylRecord.jsx`, `screens/MusicPlayer.jsx`
