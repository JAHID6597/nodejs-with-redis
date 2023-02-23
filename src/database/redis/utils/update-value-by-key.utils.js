const redisClient = require("../redis-client");
const redisClientOptions = require("../options/redis-client.options");
const deleteValueByKeyFromRedis = require("./delete-value-by-key.utils");

const updateValueByKeyInRedis = (key, value) => {
  deleteValueByKeyFromRedis(key);
  redisClient.set(key, JSON.stringify(value), redisClientOptions);
};

module.exports = updateValueByKeyInRedis;
