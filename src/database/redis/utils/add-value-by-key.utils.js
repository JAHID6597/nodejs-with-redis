const redisClient = require("../redis-client");
const redisClientOptions = require("../options/redis-client.options");

const addValueByKeyInRedis = (key, value) => {
  redisClient.set(key, JSON.stringify(value), redisClientOptions);
};

module.exports = addValueByKeyInRedis;
