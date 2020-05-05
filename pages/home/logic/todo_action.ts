export const fetchData = (action: string, res: object) => {
  return {
    type: action,
    data: res,
  };
};
