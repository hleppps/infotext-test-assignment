export const parseStringifiedArrayOfObjects = (
  stringifiedArray: string | null,
) => JSON.parse(stringifiedArray || '[]');
