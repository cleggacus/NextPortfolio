import express, { Request, Response } from "express";
import next from "next";
import api from "./app";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const server = express();

app
  .prepare()
  .then(() => {
    server.use('/api', api);

    server.get('*', (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  })
  .catch((exception) => {
    console.error(exception.stack);
    process.exit(1);
  });