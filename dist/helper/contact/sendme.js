"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transporter_1 = __importDefault(require("./transporter"));
const validateEmail_1 = __importDefault(require("./validateEmail"));
const sendme = (from, subject, text) => {
    const mailData = {
        from: 'contact@liamclegg.co.uk',
        to: 'me@liamclegg.co.uk',
        subject: `liamclegg.co.uk - ${subject}`,
        text: `subject: ${subject}
  from: ${from}
  message: ${text}`
    };
    return new Promise((resolve, reject) => {
        if (!(0, validateEmail_1.default)(from)) {
            reject("Not a valid email.");
            return;
        }
        if (!subject) {
            reject("Subject cannot be empty.");
            return;
        }
        if (!text) {
            reject("Message cannot be empty.");
            return;
        }
        transporter_1.default.sendMail(mailData, (err, info) => {
            if (err) {
                reject(err.message);
            }
            else {
                resolve(info);
            }
        });
    });
};
exports.default = sendme;
