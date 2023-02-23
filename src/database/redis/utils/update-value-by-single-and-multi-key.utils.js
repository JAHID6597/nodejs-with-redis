const getValueByKey = require("./get-value-by-key.utils");
const updateValueByKeyInRedis = require("./update-value-by-key.utils");

const updateValueBySingleAndMultiKeyInRedis = async (
  singleValueKey,
  singleValueKeyType,
  multiValueKey,
  value
) => {
  updateValueByKeyInRedis(singleValueKey, value);

  const cachedData = await getValueByKey(multiValueKey);
  if (cachedData) {
    const data = cachedData.map((i) =>
      i[singleValueKeyType] === singleValueKey ? value : i
    );

    updateValueByKeyInRedis(multiValueKey, data);
  }
};

module.exports = updateValueBySingleAndMultiKeyInRedis;
