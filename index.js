const express = require("express");
const dotenv = require("dotenv");
const { postRoutes } = require("./src/modules/post/post.routes");
const mongodbConnection = require("./src/database/mongodb/mongodb.connection");

const app = express();
app.use(express.json());

dotenv.config({ path: ".env" });
mongodbConnection();

app.use("/post", postRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`App Running On Port: ${process.env.PORT}`));
