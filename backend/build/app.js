"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = __importStar(require("express"));
//import "express-async-errors";
// import router from "./routes";
// import errorMiddleware from "./middlewares/errorMiddleware";
class App {
    constructor() {
        this.app = express.default();
        this.config();
        // Não remover essa rota
        this.app.get("/", (req, res) => res.json({ ok: true }));
        this.routes();
        // Não remova esse middleware de erro, mas fique a vontade para customizá-lo
        // Mantenha ele sempre como o último middleware a ser chamado
        // this.app.use(errorMiddleware);
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
        // this.app.use(router);
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
}
exports.App = App;
