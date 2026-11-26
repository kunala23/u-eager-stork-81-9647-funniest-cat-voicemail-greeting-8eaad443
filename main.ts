// Funniest Cat Voicemail Greeting — entry for
// make.fun competition u-eager-stork-81-9647-funniest-cat-voicemail-greeting-8eaad443
//
// The program writes exactly one voicemail greeting, as recorded by the cat
// herself, to /output/entry.txt. The gate requires UTF-8 text of 1-120
// characters, not only whitespace, so the greeting is validated here before
// it is written.
//
// The joke is built from three beats, in the order a caller hears them:
//   1. Voicemail frame — "You've reached Miso", so it is unmistakably a
//      greeting the cat recorded, in the cat's own first-person voice.
//   2. Three cat-specifics in one breath — the box, the mug on the floor,
//      and the 4 a.m. hunger — instead of one generic cat word.
//   3. The beep twist — "Meow after the beep": the cat expects the caller
//      to meow back, which lands the punch and keeps it spoken-aloud short.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const GREETING =
  "You've reached Miso. I'm in the box, the mug's on the floor, and it's 4 a.m. — I'm starving. Meow after the beep.";

const DEFAULT_OUTPUT_PATH = "/output/entry.txt";

function buildGreeting(): string {
  return GREETING.trim();
}

function checkGate(text: string): void {
  if (text.length < 1 || text.length > 120) {
    throw new Error(
      `Greeting must be 1-120 characters, got ${text.length}.`,
    );
  }
  if (!/\S/.test(text)) {
    throw new Error("Greeting must not be only whitespace.");
  }
  // Confirm it round-trips as UTF-8 with no replacement characters.
  const roundTripped = Buffer.from(text, "utf8").toString("utf8");
  if (roundTripped !== text) {
    throw new Error("Greeting is not clean UTF-8 text.");
  }
}

function main(): void {
  const outputPath = process.argv[2] ?? DEFAULT_OUTPUT_PATH;
  const text = buildGreeting();
  checkGate(text);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, text, "utf8");
  console.log(`Wrote ${text.length} characters to ${outputPath}`);
  console.log(text);
}

main();
