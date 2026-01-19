export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const withQuery = (path) => {
  return path.includes('?')
    ? `${path}&`
    : `${path}?`;
};
