export const scrollTest = async(page) => {
  await page.evaluate(() => (
    new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      let scrollTimes = 0;
      const scrollHeight = document.body.scrollHeight;

      const timer = setInterval(() => {
        if (scrollTimes > 4 || totalHeight >= scrollHeight){
          clearInterval(timer);
          resolve();
        }

        window.scrollBy(0, distance);
        totalHeight += distance;
        scrollTimes += 1;

      }, 3000);
    })
  ));
};
