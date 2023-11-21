export const isJson = (str: string | undefined) => {
  if (!str) return false;
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
