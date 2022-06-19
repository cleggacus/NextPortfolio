import Astar from "./astar";
import { AstarRequestMessage } from "./workerTypes";

export default {};

const fps = 60;
let currentTime = Date.now();

let astar: undefined | Astar;
let looping = false;

const run = () => {
  if(!astar || !looping) return;

  const now = Date.now();
  const delta = now - currentTime;

  if(delta >= 1000/fps) {
    currentTime = now;

    if(astar.isComplete()) {
      astar.restart();
      while(!astar.findValid());
    }

    astar.next();

    const path = astar.getPath();
    const closed = astar.getClosed();
    const open = astar.getOpen();
    const map = astar.getMap();
    const [width, height] = astar.getGridSize();

    postMessage({
      res: "update",
      drawData: {
        path, closed, open, map,
        width, height
      }
    });
  }

  requestAnimationFrame(run);
}

addEventListener("message", (mes: MessageEvent<AstarRequestMessage>) => {
  const req = mes.data.req;

  switch(req) {
    case "start":
      const width = mes.data.width;
      const height = mes.data.height;
      currentTime = Date.now();
      looping = true;
      astar = new Astar(width, height);
      requestAnimationFrame(run);
      break;
    case "stop":
      astar = undefined;
      looping = false;
      break;
  }
});
