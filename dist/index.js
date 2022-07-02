"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const app_1 = __importDefault(require("./app"));
const dev = process.env.NODE_ENV !== "production";
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
const server = (0, express_1.default)();
app
    .prepare()
    .then(() => {
    server.use('/api', app_1.default);
    server.get('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(port, (err) => {
        if (err)
            throw err;
        console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
})
    .catch((exception) => {
    console.error(exception.stack);
    process.exit(1);
});
