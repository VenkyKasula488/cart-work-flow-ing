export const sortCartDetails = (list, key) => {
  if (!list || (list && list.length === 0)) {
    return [];
  }

  return list.sort((a, b) => (a[key] > b[key] ? 1 : -1));
};
