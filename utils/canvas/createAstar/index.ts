import { useContext, useEffect } from "react";
import { StoreContext } from "../../../store";
import Astar from "./astar";

const getColor = (v: string) => window.getComputedStyle(document.documentElement).getPropertyValue(v);

let ctx: CanvasRenderingContext2D;
let astar: Astar;
let width: number;
let height: number;

const getGridDims = (ctx: CanvasRenderingContext2D, cellSize: number): [number, number] => {
  const ctxW = ctx.canvas.width;
  const ctxH = ctx.canvas.height;

  const gridW = Math.round(ctxW / cellSize)
  const gridH = Math.round(ctxH / cellSize)  

  return [ gridW, gridH ]
}

const animate = () => {
  if(astar && width && height && ctx) {
    if(astar.isComplete()) {
      astar.restart();
      while(!astar.findValid());
    }

    astar.next();

    const path = astar.getPath();

    const closed = astar.getClosed();
    const open = astar.getOpen();
    const map = astar.getMap();

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

    requestAnimationFrame(animate)
  }
}

const createAstar = () => {
  const [state] = useContext(StoreContext);

  useEffect(() => {
    if(state.canvasCtx) {
      ctx = state.canvasCtx;

      ctx.canvas.width = ctx.canvas.clientWidth;
      ctx.canvas.height = ctx.canvas.clientHeight;

      [width, height] = getGridDims(ctx, 20);
      astar = new Astar(width, height);

      while(!astar.findValid());

      animate();

      window.onresize = () => {}
      window.onmousemove = e => {}
    }
  }, [state.canvasCtx])
}

export default createAstar;