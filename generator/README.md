# Deck generator

Builds the three guest-lecture decks in `../decks` (pptxgenjs, Montserrat, EE-Partner look).

```bash
npm install pptxgenjs react-icons react react-dom sharp
PPTX_SKILL=<pptx skill dir> NODE_PATH=./node_modules node build.js ../decks
```

`wave.py` regenerates the wave graphics in `assets/`.
