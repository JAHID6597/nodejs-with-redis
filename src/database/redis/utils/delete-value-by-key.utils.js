const redisClient = require("../redis-client");

const deleteValueByKeyFromRedis = (key) => {
  redisClient.del(key);
};

module.exports = deleteValueByKeyFromRedis;
