export function toTitleCase(word: string) {
  let updatedWord = word.toLowerCase();
  updatedWord = updatedWord.charAt(0).toUpperCase() + updatedWord.slice(1);
  return updatedWord;
}
