export function range(len: number) {
  const a = [];
  for (let i = 0; i < len; i++) {
    a.push(i);
  }
  return a;
}

export function zeros(len: number) {
  const a = [];
  for (let i = 0; i < len; i++) {
    a.push(0);
  }
  return a;
}

export function zeros2d(rows: number, cols: number) {
  const a: number[][] = [];
  for (let i = 0; i < rows; i++) {
    const b: number[] = [];
    for (let j = 0; j < cols; j++) {
      b.push(0);
    }
    a.push(b);
  }
  return a;
}
