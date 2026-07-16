# Pin the Player to the bottom with flex (no `position: 'absolute'`)

## Goal

Keep the player bar at the bottom of the screen using **column flex**, not absolute positioning.

## Layout pattern

```
SafeAreaView (flex: 1, column)
├── Header          ← natural height
├── Middle (flex:1) ← fills leftover space
│   ├── ToneArm
│   └── VinylRecord
└── Player          ← natural height, sits at bottom
```

In a column, the last item ends up at the bottom **if** something above it absorbs the extra space with `flex: 1`.

---

## Why `alignSelf: 'flex-end'` / `justifySelf` do not work

| Style | Reality in React Native |
|---|---|
| `justifySelf` | Not a valid RN style — ignored |
| `alignSelf: 'flex-end'` | Only moves on the **cross** axis (horizontal in a column), not to the bottom of the screen |
| `position: 'absolute'` + `bottom: 0` | Works, but pulls the player out of document flow |

Absolute children also **do not take flex space**, so they cannot “push” siblings.

---

## Why the player does not stick to the bottom today

1. Player uses `justifySelf` / `alignSelf: 'flex-end'` (wrong axis / invalid).
2. Vinyl is `position: 'absolute'` — out of flow, so the column only sizes to header + tone arm + player.
3. ToneArm’s image is absolute inside a zero-height wrapper — also little/no flex participation.

---

## Recommended structure

### `MusicPlayer.jsx`

```jsx
<SafeAreaView
  style={{
    flex: 1,                 // fill screen (prefer over height: '100%')
    flexDirection: 'column',
    backgroundColor: '#323136',
    paddingTop: 32,
    paddingHorizontal: 16,
  }}
>
  {/* Top bar — natural height */}
  <View
    style={{
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <NavBar />
    <Text style={{ /* title styles */ }}>VINYL</Text>
    <Menu />
  </View>

  {/* Middle — eats remaining space and pushes Player down */}
  <View style={{ flex: 1, justifyContent: 'center', position: 'relative' }}>
    <VinylRecord />
    <ToneArm />
  </View>

  {/* Bottom — natural height, no absolute */}
  <Player />
</SafeAreaView>
```

### `Player.jsx`

Drop the “end” hacks; keep a fixed (or content) height:

```jsx
playerContainer: {
  flexDirection: 'row',
  backgroundColor: 'red',
  width: '100%',
  height: 200,
  // no position: 'absolute'
  // no justifySelf
  // no alignSelf: 'flex-end'
},
```

### Vinyl / tone arm

For flex to work, stop taking them out of **screen** flow. Absolute is still OK **inside** the middle `flex: 1` box only (e.g. tone arm over vinyl).

```jsx
// VinylRecord — flex child of the stage
style={{
  flex: 1,
  width: '100%',
  alignSelf: 'center',
  padding: 24,
}}
```

```jsx
// Stage middle
<View style={{ flex: 1 }}>
  <VinylRecord />           {/* in flow, flex: 1 */}
  <ToneArm />               {/* absolute only within this box if needed */}
</View>
<Player />                  {/* bottom via column flex */}
```

---

## Alternative: `marginTop: 'auto'`

If you do not want a middle wrapper, and the parent is a full-height column:

```jsx
<SafeAreaView style={{ flex: 1 }}>
  <Header />
  <VinylRecord />
  <Player style={{ marginTop: 'auto' }} />
</SafeAreaView>
```

`marginTop: 'auto'` consumes free space above the player and pins it to the bottom — still no absolute positioning.

---

## Mental model

| Style | Role |
|---|---|
| Parent `flex: 1` + `flexDirection: 'column'` | Full-height column |
| Middle `flex: 1` | Grows and pushes footer down |
| Player (no flex grow, fixed height) | Sits under middle → bottom of screen |
| `marginTop: 'auto'` on Player | Alternate way to pin footer without a middle wrapper |

---

## Checklist

1. Screen root: `flex: 1` (or equivalent full height).
2. Column direction: `flexDirection: 'column'` (default, but be explicit).
3. Something above the player has `flex: 1` **or** player has `marginTop: 'auto'`.
4. Player is the last child (or after the growing middle).
5. Player is **not** `position: 'absolute'`.
6. Avoid `justifySelf` / `alignSelf: 'flex-end'` for vertical bottom placement.
