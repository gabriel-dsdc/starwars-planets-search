const A_BEFORE_B = -1;

export function setOrderByColumn(acc, order) {
  acc.sort((item1, item2) => {
    if (item1[order.column] === 'unknown') return 1;
    if (item2[order.column] === 'unknown') return A_BEFORE_B;
    const a = Number(item1[order.column]);
    const b = Number(item2[order.column]);
    if (order.sort === 'ASC') {
      return a - b;
    }
    return b - a;
  });
}

export function sortAlphabetically(acc) {
  acc.sort((a, b) => {
    const name1 = a.name.toLowerCase();
    const name2 = b.name.toLowerCase();
    if (name1 > name2) { return 1; }
    return A_BEFORE_B;
  });
}
