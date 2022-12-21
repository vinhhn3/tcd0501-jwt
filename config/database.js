const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

mongoose.set("strictQuery", false);

exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database ...");
    })
    .catch((error) => {
      console.log("Error connecting");
      console.log(error);
      process.exit(1);
    });
};
