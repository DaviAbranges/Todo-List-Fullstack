"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
//import "express-async-errors";
const routes_1 = require("./routes");
// import router from "./routes";
// import errorMiddleware from "./middlewares/errorMiddleware";
class App {
    constructor() {
        this.app = express();
        this.config();
        this.app.get("/", (req, res) => res.json({ ok: true }));
        this.routes();
        this.app.get("/", (req, res) => res.json({ ok: true }));
        this.routes();
    }
    config() {
        const accessControl = (_req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS,PUT,PATCH");
            res.header("Access-Control-Allow-Headers", "*");
            next();
        };
        this.app.use(express.json());
        this.app.use(accessControl);
    }
    routes() {
        this.app.use(routes_1.default);
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map