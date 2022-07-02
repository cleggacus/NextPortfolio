import express, {Request, Response, NextFunction} from "express";
import sendme from "../helper/contact/sendme";
import confirm from "../helper/contact/confirm";

const router = express.Router();

router.post("/send", (req: Request, res: Response, next: NextFunction) => {
  const  {from, subject, text} = req.body;

  sendme(from, subject, text)
    .then(_info => confirm(from))
    .then(_info => {
      res.status(200).json({
        mes: "sent"
      });
    })
    .catch(err => {
      res.status(500).json({
        mes: err
      });
    })
});

export default router;