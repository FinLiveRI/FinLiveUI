const getRandomDelay = (min = 500, max = 5000) =>
  Math.floor(Math.random() * (max - min) + min);

const delay = async (min?: number, max?: number) => {
  return new Promise((resolve) =>
    setTimeout(resolve, getRandomDelay(min, max))
  );
};

export default delay;
