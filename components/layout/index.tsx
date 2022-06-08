import { FC, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { Menu } from "@styled-icons/boxicons-regular";
import styles from "../../styles/layout.module.scss"
import Button from "../core/button";

type LayoutProps = {
  children?: ReactNode,
  flipped?: number
}

const Layout: FC<LayoutProps> = ({ children, flipped }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if(canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if(ctx)
        initializeCanvas(ctx);
    }
  }, [canvasRef])

  useEffect(() => {
    window.onresize = () => {
      if(canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");

        if(ctx)
          initializeCanvas(ctx);
      }
    }

    window.onmousemove = e => {
      if(canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");

        if(ctx)
          initializeCanvas(ctx, e.pageX, e.pageY);
      }
    }
  }, []);

  const initializeCanvas = (ctx: CanvasRenderingContext2D, cx = 0, cy = 0, r = 4) => {
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

  const getFlipped = () => {
    if(flipped == undefined)
      return 0;

    if(flipped >= 1)
      return 1;

    if(flipped <= 0)
      return 0;

    return flipped;
  }

  return <div style={{ backgroundPosition: `0 ${(getFlipped())*100}%` }} className={`${styles.container} ${getFlipped() > 0.5 ? styles.flipped : ""}`}>
    <div style={{ backgroundPosition: `0 ${(getFlipped())*100}%` }} className={styles.containerInner}>
      <canvas ref={canvasRef}></canvas>

      <div className={styles.info}>
        <p>@cleggacus / made with next.js</p>
      </div>

      <div className={styles.content}>
        { children }
      </div>

      <div className={styles.menuTitle}>
        <h2>WELCOME</h2>
        <h2>FREIND</h2>
      </div>

      <Button className={styles.menuIcon}>
        <Menu/>
      </Button>
    </div>
  </div>
}

export default Layout;
