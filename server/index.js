const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const { Nuxt, Builder } = require("nuxt");
const cors = require("cors");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
require("babel-register");
const fetch = require("node-fetch");

global.fetch = fetch;

dotenv.config({
  path: path.resolve(`${__dirname}/../.env`)
});

const port = process.env.PORT || 3000;
const app = express();
const user = require("./router/user");
const settings = require("./router/settings");
var corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"]
};
app.use(cors(corsOption));
if (process.env.NODE_ENV === "development") {
  console.log("Environment is development");
  mongoose
    .connect(
      process.env.DB_HOST,
      {
        // useNewUrlParser: true,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS
        // useUnifiedTopology: true
      }
    )
  const connection = mongoose.connection;
  connection
    .on("error", () => console.log(" :( Connection Failed"))
    .once("open", () => console.log(" :) Connected Successfully"));
} else {
  console.log("Environment is production");
  mongoose
    .connect(
      process.env.DB_HOST,
      {
        // useNewUrlParser: true,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS
        // useUnifiedTopology: true
      }
    )
    .then(
      () => {
        const connection = mongoose.connection;
        connection.once("open", () =>
          console.log(" :) Connected Successfully")
        );
      },
      err => {
        console.log(err);
      }
    );
}

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(
  session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

let config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

app.use("/", user);
app.use("/settings", settings);

const nuxt = new Nuxt(config);

if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build();
}

app.use(nuxt.render);

app.listen(port, () => {
  console.log(`${process.env.SITE_NAME} runs at ${process.env.FRONTEND_BASE}`);
});
