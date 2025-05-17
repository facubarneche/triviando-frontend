export const playSound = (src: string) => {
  const audio = new Audio(src);
  audio.play();
};
