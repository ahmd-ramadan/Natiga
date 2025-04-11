const express = require("express");
const { config } = require("dotenv");
const { startApp } = require("./src/start-app");

config({ path: ".env" });
const app = express();

startApp({ app, express });
