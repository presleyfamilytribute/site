
// Famous Elvis Presley quotes
export const elvisQuotes = [
  "Ambition is a dream with a V8 engine.",
  "Truth is like the sun. You can shut it out for a time, but it ain't goin' away.",
  "When things go wrong, don't go with them.",
  "The image is one thing and the human being is another.",
  "I don't know anything about music. In my line you don't have to.",
  "I'm not trying to be sexy. It's just my way of expressing myself when I move around.",
  "Rhythm is something you either have or don't have, but when you have it, you have it all over.",
  "Some people tap their feet, some people snap their fingers, and some people sway back and forth. I just sorta do 'em all together, I guess.",
  "I learned very early in life that: 'Without a song, the day would never end; without a song, a man ain't got a friend; without a song, the road would never bend - without a song.'",
  "Rock and roll music, if you like it, if you feel it, you can't help but move to it.",
  "Animals don't hate, and we're supposed to be better than them.",
  "I'm trying to keep a level head. You have to be careful out in the world.",
  "I'm strictly for Stevenson. I don't dig the intellectual bit, but I'm telling you, man, he knows the most.",
  "A live concert to me is exciting because of all the electricity that is generated in the crowd and on stage.",
  "Until we meet again, may God bless you as he has blessed me."
];

// Get a random quote
export const getRandomQuote = (): string => {
  const randomIndex = Math.floor(Math.random() * elvisQuotes.length);
  return elvisQuotes[randomIndex];
};
