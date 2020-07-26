const port = 8000;
const dbName = "dbFreezer";
const express = require("express");
const cors = require("cors");

//db connection
require("./config/mongoose.config")(dbName);

//server
const app = express();
app.use(express.json()); //for req.body parsing
app.use(cors());         //for cross-origin resource sharing (CORS)

//routes
require("./routes/freezer.routes")(app);

//listen
app.listen(port, () => {
  console.log(`Listing for request on port ${port} to respond to.`);
});
