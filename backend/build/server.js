"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.APP_PORT || 3001;
const app = new app_1.App();
app.start(PORT);
