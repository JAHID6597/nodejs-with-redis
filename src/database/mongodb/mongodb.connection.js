const mongoose = require("mongoose");

const mongodbConnection = () => {
  mongoose.set('strictQuery', false);

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Mongodb Connected"))
    .catch((error) => console.log("Not Connected", error));
};

module.exports = mongodbConnection;
