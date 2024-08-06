const cors = require("cors");
const express = require('express');
const indexRouter = require('./src/routes/index');
const app = express();
// const https = require("https");
const bodyParser = require("body-parser");
const db = require("./src/config/database");
const PORT = process.env.PORT;
const errorHandler = require("./src/middleware/errorHandler");
const { documentation } = require("./public/documentation-api/documentation-api");
const { cekSecretKey } = require("./src/middleware/authorization");
const { kopi } = require("./src/utils/listen");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
  credentials: true
};

app.use(cors(corsOptions));

app.use('/documentation-api', documentation)
app.use('/api-v1', cekSecretKey, indexRouter);

app.use(errorHandler);

db.authenticate()
  .then(() => {
    app.listen(PORT, console.log(
      kopi
      `server running...on Port ${PORT}`
    ));
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });