const addValueByKey = require("./add-value-by-key.utils");
const deleteValueByKeyFromRedis = require("./delete-value-by-key.utils");
const getValueByKey = require("./get-value-by-key.utils");
const updateValueByKeyInRedis = require("./update-value-by-key.utils");

const deleteValueBySingleAndMultiKeyFromRedis = async (
  singleValueKey,
  singleValueKeyType,
  multiValueKey
) => {
  deleteValueByKeyFromRedis(singleValueKey);

  const cachedData = await getValueByKey(multiValueKey);
  if (cachedData) {
    const data = cachedData.filter(
      (i) => i[singleValueKeyType] !== singleValueKey
    );

    updateValueByKeyInRedis(multiValueKey, data);
  }
};

module.exports = deleteValueBySingleAndMultiKeyFromRedis;
