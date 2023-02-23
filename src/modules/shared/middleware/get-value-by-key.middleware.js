const getValueByKeyFromRedis = require("../../../database/redis/utils/get-value-by-key.utils");

const getValueByKey = (key, isReqParamsKey) => {
  return async (req, res, next) => {
    try {
      const newKey = isReqParamsKey ? req.params[key] : key;

      const data = await getValueByKeyFromRedis(newKey);
      if (data) {
        return res.status(200).send(data);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = getValueByKey;
