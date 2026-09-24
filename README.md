# One Piece Character Quiz

A browser quiz game about One Piece characters. Guess the character from a quote, an emoji clue or a picture.

## How to play

Each question shows a clue and four names. Pick the character it belongs to.

- **Game Mode**
  - 🎲 **Random:** mixes all clue types.
  - 📜 **Only Quote:** a line the character said.
  - 😄 **Only Emoji:** four emojis describing the character.
  - 🖼️ **Only Image:** the character's picture.
- **Lives**
  - ❤️ **3 Lives:** every wrong answer costs a life.
  - 💀 **1 Life:** the first mistake ends the game.

A correct answer is worth 1 point. When your lives run out, the game over screen shows your score. The best score for each lives setting is saved in your browser.

If you change the game mode during a question, the new mode starts with the next question. Changing it doesn't skip the one on screen.

## Running it

It's plain HTML, CSS and JavaScript, with no build step and no dependencies.

- **Quickest:** open `index.html` in a browser.
- **Or serve the folder locally**, for example:

  ```
  python -m http.server
  ```

  Then go to <http://localhost:8000>.

You need an internet connection for the character images and fonts. Quote and emoji questions still work if the quote API is down.

## Data sources

| Clue | Source |
|---|---|
| Images | [Jikan API](https://jikan.moe/) (unofficial MyAnimeList API): the 150 most favorited One Piece characters. More popular characters come up more often. |
| Quotes | [yurippe quote API](https://yurippe.vercel.app/), with the offline pool in `quotes_fallback.js` as a backup |
| Emojis | Hand-made clues in `one_piece_emojis.js` |

The APIs use real names (`Kaidou`, `Marshall D. Teach`) while the game uses the names fans know best (`Kaido`, `Blackbeard`). `NAME_ALIASES` in `quiz.js` maps one to the other. Characters that aren't in `characterList` are skipped, so the correct answer can't be spotted by how its name is written.

## Project structure

```
index.html            Page layout
style.css             Styles, including mobile breakpoints
quiz.js               Game logic: loading data, questions, lives, scores
one_piece_emojis.js   Emoji clues (EMOJI_DATA)
quotes_fallback.js    Offline quote pool (QUOTE_DATA)
Photos/               Background and favicon
```

## Adding content

- **A new character:** add the name to `characterList` in `quiz.js`. It then shows up as a choice.
- **An emoji clue:** add `{ "character": "...", "emoji": "..." }` to `one_piece_emojis.js`. The character must be in `characterList`. Avoid emojis that give the name away (👑 for King, for example).
- **A quote:** add it to `quotes_fallback.js`. Quotes that contain the speaker's own name are filtered out automatically.
- **An API name that differs:** add it to `NAME_ALIASES` in `quiz.js`.

## Disclaimer

This is a fan project with no affiliation to Eiichiro Oda, Shueisha or Toei Animation. One Piece and its characters belong to their respective owners.
