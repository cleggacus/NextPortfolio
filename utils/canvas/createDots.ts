import { useContext, useEffect } from "react";
import { StoreContext } from "../../store";

const drawDots = (ctx: CanvasRenderingContext2D, cx = 0, cy = 0, r = 4) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;

  const boxSize = 25;
  const dotRadius = 3;

  const offsetX = 0;
  const offsetY = 0;

  cx /= boxSize;
  cy /= boxSize;

  for(let x = 0; x < ctx.canvas.width / boxSize + 1; x++) {
    for(let y = 0; y < ctx.canvas.height / boxSize + 1; y++) {
      let d = Math.sqrt(Math.pow(cx-x, 2) + Math.pow(cy-y, 2));

      ctx.fillStyle = `rgba(234,223,198,${d < 0.5 ? 1 : (r/d)})`;
      ctx.beginPath();
      ctx.arc(offsetX + x*boxSize, offsetY + y*boxSize, dotRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }
}

const createDots = () => {
  const [state] = useContext(StoreContext);

  useEffect(() => {
    if(state.canvasCtx) {
      window.onresize = () => {
        if(state.canvasCtx)
          drawDots(state.canvasCtx);
      }

      window.onmousemove = e => {
        if(state.canvasCtx)
          drawDots(state.canvasCtx, e.pageX, e.pageY);
      }

      drawDots(state.canvasCtx);
    }
  }, [state.canvasCtx])
}

export {drawDots}
export default createDots;