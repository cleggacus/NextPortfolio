import { useContext, useEffect } from "react";
import { StoreContext } from "../../../store";
import { AstarResponseMessage, DrawData } from "./workerTypes";

let processing = false;
let worker: Worker | undefined = undefined;

const getGridDims = (ctx: CanvasRenderingContext2D, cellSize: number): [number, number] => {
  const ctxW = ctx.canvas.width;
  const ctxH = ctx.canvas.height;

  const gridW = Math.round(ctxW / cellSize)
  const gridH = Math.round(ctxH / cellSize)  

  return [ gridW, gridH ]
}

const getColor = (v: string) => window.getComputedStyle(document.documentElement).getPropertyValue(v);

const draw = (ctx: CanvasRenderingContext2D, drawData: DrawData) => {
  if(processing) return;

  processing = true;

  const {
    open, closed, path, map,
    width, height
  } = drawData;

  const cellW = ctx.canvas.width / width;
  const cellH = ctx.canvas.height / height;
  const dotRadius = 3;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for(const [x, y] of open) {
    ctx.fillStyle = getColor("--bg-1");
    ctx.beginPath();
    ctx.arc(x * cellW, y * cellH, dotRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  for(const [x, y] of closed) {
    ctx.fillStyle = getColor("--bg-1");
    ctx.beginPath();
    ctx.arc(x * cellW, y * cellH, dotRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  ctx.strokeStyle = getColor("--bg-3");
  ctx.lineWidth = dotRadius*2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(path[0][0] * cellW, path[0][1] * cellH);

  for(let i = 1; i < path.length; i++) {
    const [x, y] = path[i];
    ctx.lineTo(x*cellW, y*cellH);
  }

  ctx.stroke();
  ctx.closePath();

  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      if(map[y][x]) {
        ctx.fillStyle = getColor("--bg-3");
        ctx.beginPath();
        ctx.arc(x * cellW, y * cellH, dotRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
    }
  }

  processing = false;
}

const startAstar = (ctx: CanvasRenderingContext2D) => {
  if(typeof Worker !== undefined) {
    worker = new Worker(new URL("./astar.worker.ts", import.meta.url));
    const [width, height] = getGridDims(ctx, 20);

    worker.addEventListener("message", (mes: any) => {
      const data: AstarResponseMessage = mes.data;

      switch(data.res) {
        case "update":
          draw(ctx, data.drawData);
          break;
      }
    })

    worker.postMessage({
      req: "start",
      width, height
    });
  }
}


const createAstar = (canvas?: HTMLCanvasElement) => {
  if(!canvas) return;

  const ctx = canvas.getContext("2d");

  if(ctx) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    console.log("start")
    startAstar(ctx);
  }
}

const stopAstar = () => {
  console.log("w");
  if(worker) {
    worker.postMessage({
      req: "stop"
    })
  }
}

export default createAstar;

export {
  stopAstar
}
