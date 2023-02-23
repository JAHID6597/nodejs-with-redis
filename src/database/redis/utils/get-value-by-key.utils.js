const redisClient = require("../redis-client");

const getValueByKeyFromRedis = async (key) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

module.exports = getValueByKeyFromRedis;
