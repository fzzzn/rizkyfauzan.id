export const quotes = [
  "People die when they are killed, but the memories last forever.",
  "Even in a thousand years, some things never change.",
  "The weight of time makes even the strongest magic fade.",
  "Understanding someone takes more than just a few decades.",
  "Sometimes the journey matters more than the destination.",
  "Magic is just a tool. What matters is how you use it.",
  "Even if you live for a thousand years, every moment is precious.",
  "The bonds we form are stronger than any spell.",
  "Time teaches us the value of things we once took for granted.",
  "Even immortals have things worth protecting.",
];

export const getRandomQuote = (): string => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};
