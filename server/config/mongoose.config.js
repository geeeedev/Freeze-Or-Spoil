const mongoose = require("mongoose");

module.exports = (dbName) => {
  mongoose
    .connect(`mongodb://localhost/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then((res) => {
      console.log(`Mongoose Config Successfully connected to ${dbName}`);
    })
    .catch((err) => {
      console.log(`Mongoose Config Failed to connect to ${dbName}`, err);
    });
};
