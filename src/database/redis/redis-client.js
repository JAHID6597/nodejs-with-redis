const connectRedisClient = require("./connection/redis-client.connection");

const redisClient = connectRedisClient();

module.exports = redisClient;
