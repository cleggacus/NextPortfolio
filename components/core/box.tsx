import { FC, MouseEventHandler, ReactNode, TouchEventHandler, useContext, useEffect, useRef, useState } from "react"
import { StoreContext } from "../../store"

import styles from "../../styles/core/box.module.scss"

type Animation = {
  type: ("down" | "up" | "opacity")[],
  amount: number,
  from: number,
  to: number
}

type BoxProps = {
  children?: ReactNode,
  className?: string,
  onClick?: MouseEventHandler<HTMLDivElement>,
  onTouchStart?: TouchEventHandler<HTMLDivElement>,
  animate?: Animation
}

const Box: FC<BoxProps> = ({ children, className, onClick, onTouchStart, animate }) => {
  const [state] = useContext(StoreContext);
  const ref = useRef<HTMLDivElement>(null);

  let y = 0;

  useEffect(() => {
    if(state.onScroll && ref.current && animate) {
      state.onScroll(findPos);
      ref.current.style.transform = `translate(0, 0)`;
      findPos()
    }
  }, [ref.current])

  const findPos = () => {
    if(animate && ref.current) {

      const pos = -ref.current.getBoundingClientRect().top + y;
      const dist = animate.to - animate.from;

      let percent = (pos - animate.from) / dist;


      if(percent < 0) percent = 0;
      else if(percent > 1) percent = 1;

      if(animate.type.includes("down")) {
        y = -(1-percent) * animate.amount;
        ref.current.style.transform = `translate(0, ${-(1-percent) * animate.amount}px)`;
      }

      if(animate.type.includes("up")) {
        y = (1-percent) * animate.amount;
        ref.current.style.transform = `translate(0, ${(1-percent) * animate.amount}px)`;
      }

      if(animate.type.includes("opacity"))
        ref.current.style.opacity = `${percent}`;
    }
  }

  return <div ref={ref} onClick={onClick} onTouchStart={onTouchStart} className={`${styles.container} ${className}`}>
    { children }
  </div>
}

export default Box

export type {
  Animation
}