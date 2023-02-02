export function accPred<T, V>(accessor: (element: T) => V, reverse: boolean = false) {
  return (e1: T, e2: T): number => {
    const order = reverse ? -1 : 1;
    return accessor(e1) < accessor(e2) ? order : -order;
  };
}
