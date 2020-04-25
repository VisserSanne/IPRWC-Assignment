export function sortSafe<T>(arr: T[], compare: (a: T, b: T) => number): T[] {
  const newArray = [...arr]; //create copy
  newArray.sort(compare);
  return newArray;
}
