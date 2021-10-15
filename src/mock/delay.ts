const getRandomDelay = (min=500, max=5000) => Math.floor(Math.random() * (max - min) + min);

const delay = async() => {
  return new Promise(resolve => setTimeout(resolve, getRandomDelay()));
}

export default delay;
