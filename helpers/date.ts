export const convertDateFormat = (dateObject: Date) => {
  let dateNow = new Date();

  if (dateObject) {
    dateNow = dateObject;
  }

  let month = `${(dateNow.getMonth() + 1)}`;
  let day = `${dateNow.getDate()}`;
  const year = dateNow.getFullYear();
  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return `${day}-${month}-${year}`;
};
