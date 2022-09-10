const getRandomInt = (max) => Math.floor(Math.random() * max);
const getRandomBool = () => Math.floor(Math.random() * 2) === 0;

module.exports = { getRandomInt, getRandomBool };
