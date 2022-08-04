import type { NextPage } from 'next'
import { useRef, useState } from 'react';
import Box from '../components/core/box';
import Button from '../components/core/button';
import Input from '../components/core/input';
import Textarea from '../components/core/textarea';
import styles from "../styles/contact.module.scss";

const Contact: NextPage = () => {  
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [sent, setSent] = useState<"unsent" | "sending" | "sent" | "err">("unsent")

  const send = () => {
    setSent("sending")

    if(!emailRef.current || !subjectRef.current || !messageRef.current)
      return;

    const data = {
      from: emailRef.current.value,
      subject: subjectRef.current.value,
      text: messageRef.current.value
    }

    fetch("/api/contact/send", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        if(data.mes == "sent") {
          setSent("sent")
        } else {
          setSent("err")
        }
      })
  }

  return <div className={styles.container}>
    {
      sent == "sent" ?
        <Box className={styles.box}>
          <h1 className={styles.sentTitle}>Message sent successfully.</h1>
        </Box> :
      sent == "sending" ?
        <Box className={styles.box}>
          <h1 className={styles.sentTitle}>Sending . . .</h1>
        </Box> :
      sent == "err" ?
        <Box className={styles.box}>
          <h1 className={styles.sentTitle}>An error has occured.</h1>
          <p>Send a email to cleggaus@gmail.com if you wish to contact me.</p>
        </Box> :
        <Box className={styles.box}>
          <h1>Contact Me</h1>
          <Input ref={emailRef} placeholder="EMAIL"></Input>
          <Input ref={subjectRef} placeholder="SUBJECT"></Input>
          <Textarea ref={messageRef} rows={4} placeholder="MESSAGE"></Textarea>
          <Button onClick={send} shadow="none">SEND MESSAGE</Button>
        </Box>
    }
  </div>
}

export default Contact
