// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sendme from '../../../utils/api/contact/sendme';
import confirm from '../../../utils/api/contact/confirm';

type Data = {
  mes: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method == 'POST') {
    const {from, subject, text} = req.body;

    sendme(from, subject, text)
      .then(() => confirm(from))

    res.status(200).json({
      mes: "sent"
    });
  }
}
