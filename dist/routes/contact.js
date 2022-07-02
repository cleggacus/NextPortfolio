"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sendme_1 = __importDefault(require("../helper/contact/sendme"));
const confirm_1 = __importDefault(require("../helper/contact/confirm"));
const router = express_1.default.Router();
router.post("/send", (req, res, next) => {
    const { from, subject, text } = req.body;
    (0, sendme_1.default)(from, subject, text)
        .then(_info => (0, confirm_1.default)(from))
        .then(_info => {
        res.status(200).json({
            mes: "sent"
        });
    })
        .catch(err => {
        res.status(500).json({
            mes: err
        });
    });
});
exports.default = router;
