export const pagination = (c, m) => {
  const delta = 5;
  const range = [];
  const rangeWithDots = [];
  let l;

  range.push(1);
  for (let i = c - delta; i <= c + delta; i++) {
    if (i < m && i > 1) {
      range.push(i);
    }
  }
  range.push(m);

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};
