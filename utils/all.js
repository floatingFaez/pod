export const cx = (...classNames) =>
  classNames.filter(Boolean).join(" ");

// because we use sanity-next-image
// vercel throws error when using normal imports
export const myLoader = ({ src }) => {
  return src;
};


export const clamp = (n, min, max) => {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}

export const randomBetween = (min, max) => { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}