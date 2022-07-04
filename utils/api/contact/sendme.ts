import transporter from "./transporter";
import validateEmail from "./validateEmail";

const sendme = (from: string, subject: string, text: string) => {
  const mailData = {
    from: 'contact@liamclegg.co.uk',
    to: 'me@liamclegg.co.uk',
    subject: `liamclegg.co.uk - ${subject}`,
    text: `subject: ${subject}
  from: ${from}
  message: ${text}`
  }

  return new Promise((resolve, reject) => {
    if(!validateEmail(from)) {
      reject("Not a valid email.");
      return;
    } 

    if(!subject) {
      reject("Subject cannot be empty.");
      return;
    }

    if(!text) {
      reject("Message cannot be empty.");
      return;
    }

    transporter.sendMail(mailData, (err, info) => {
      if(err) {
        reject(err.message);
      } else {
        resolve(info);
      }
    })
  })
}

export default sendme;