const addValueByKey = require("./add-value-by-key.utils");
const getValueByKey = require("./get-value-by-key.utils");
const updateValueByKeyInRedis = require("./update-value-by-key.utils");

const addValueBySingleAndMultiKeyInRedis = async (
  singleValueKey,
  multiValueKey,
  value
) => {
  addValueByKey(singleValueKey, value);

  const cachedData = await getValueByKey(multiValueKey);
  if (cachedData) {
    const data = [...cachedData, value];

    updateValueByKeyInRedis(multiValueKey, data);
  }
};

module.exports = addValueBySingleAndMultiKeyInRedis;
