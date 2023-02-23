const Redis = require("redis");

const connectRedisClient = () => {
  const redisUrl = process.env.REDIS_URL;
  const client = Redis.createClient({ url: redisUrl });

  (async () => await client.connect())();

  client.on("connect", () => console.log("Redis Client Connected."));
  client.on("error", (err) =>
    console.log("Redis Client Connection Error - ", err)
  );

  return client;
};

module.exports = connectRedisClient;
