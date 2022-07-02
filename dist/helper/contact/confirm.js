"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transporter_1 = __importDefault(require("./transporter"));
const confirm = (from) => {
    const mailData = {
        from: 'contact@liamclegg.co.uk',
        to: from,
        subject: `Message sent.`,
        text: `This email is to confirm that you have sent a message to liam clegg. I will respond as soon as i see the message.
  If you would like to directly email me use the email cleggacus@gmail.com or me@liamclegg.co.uk
  Thank you!`
    };
    return new Promise((resolve, reject) => {
        transporter_1.default.sendMail(mailData, (err, info) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(info);
            }
        });
    });
};
exports.default = confirm;
