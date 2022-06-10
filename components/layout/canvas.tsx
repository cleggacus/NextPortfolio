import { useContext, useEffect, useRef } from "react";
import { StoreContext } from "../../store";

const Canvas = () => {
  const [, dispatch] = useContext(StoreContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if(canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if(ctx) {
        dispatch({
          type: "setCtx",
          payload: ctx
        })
      }
    }
  }, [canvasRef])

  return <canvas ref={canvasRef}></canvas>
}

export default Canvas;

