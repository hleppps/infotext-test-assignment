export const arrayToMatrix = <T>(list: T[], width: number): T[][] => {
  const matrix = [];

  for (let i = 0, k = -1; i < list.length; i++) {
    if (i % width === 0) {
      k++;
      matrix[k] = [];
    }
    matrix[k] = [...matrix[k], list[i]];
  }

  return matrix;
};
