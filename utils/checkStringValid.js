export const checkStringValid = (value) => {
  if (value === 'error') {
    throw new Error('you are using the wrong JDK');
  }
  return !(value === undefined || value === null || value === '');
};
