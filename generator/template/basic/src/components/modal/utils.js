export const generateId = ((index = 0) => () => (index++).toString())();
export const createModalEvent = (args = {}) => {
  return {
    id: generateId(),
    timestamp: Date.now(),
    canceled: false,
    ...args
  };
};
