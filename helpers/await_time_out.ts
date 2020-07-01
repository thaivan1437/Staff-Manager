export const awaitTimeOut = (msTimeOut) => {
  return new Promise((done) => {
    setTimeout(() => {
      return done();
    }, msTimeOut);
  });
};
