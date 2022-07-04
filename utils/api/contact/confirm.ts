import transporter from "./transporter";

const confirm = (from: string) => {
  const mailData = {
    from: 'contact@liamclegg.co.uk',
    to: from,
    subject: `Message sent.`,
    text: `This email is to confirm that you have sent a message to liam clegg. I will respond as soon as i see the message.
  If you would like to directly email me use the email cleggacus@gmail.com or me@liamclegg.co.uk
  Thank you!`
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if(err) {
        reject(err);
      } else {
        resolve(info);
      }
    })
  })
}

export default confirm;