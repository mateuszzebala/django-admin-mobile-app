export const stringEllipsis = (text: string, maxLength: number): string => {
  if (text.length < maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
};

export const toString = (obj: any): string => {
  return obj + "";
};

export const multipleWord = (num: number, word: string) => {
  return `${num} ${word}${num == 1 ? "" : "s"}`;
};
