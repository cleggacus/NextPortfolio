import React, { useContext, useState } from "react"
import { cloneElement, FC, forwardRef, ReactElement, useEffect, useRef } from "react"
import { StoreContext } from "../../store"

type AnimateProps = {
  children?: ReactElement,

  from: {
    scroll: number
    x?: number,
    y?: number,
    opacity?: number
  }

  to: {
    scroll: number
    x?: number,
    y?: number,
    opacity?: number
  }
}

const Animate: FC<AnimateProps> = ({ children, from, to }) => {
  const ref = useRef<HTMLElement>(null);
  const [state] = useContext(StoreContext);

  const isX = () => from.x != undefined && to.x != undefined;
  const isY = () => from.y != undefined && to.y != undefined;

  let y = 0;
  let x = 0;

  useEffect(() => {
    if(state.onScroll && ref.current) {
      state.onScroll(onScroll);

      if(isX() || isY())
        ref.current.style.transform = `translate(0, 0)`;

      onScroll()
    }
  }, [ref.current])

  const onScroll = () => {
    if(ref.current) {
      const pos = -ref.current.getBoundingClientRect().top + y;
      const dist = to.scroll - from.scroll;

      let percent = (pos - from.scroll) / dist;

      if(percent < 0) percent = 0;
      else if(percent > 1) percent = 1;


      if(from.y != undefined && to.y != undefined) {
        y = (1-percent) * (from.y-to.y) + to.y;
      }

      if(from.x != undefined && to.x != undefined) {
        x = (1-percent) * (from.x-to.x) + to.x;
      }

      ref.current.style.transform = `translate(${x}px, ${y}px)`;

      if(from.opacity != undefined && to.opacity != undefined) {
        ref.current.style.opacity = `${percent}`;
      }
    }
  }

  return <>
    { 
      children ? cloneElement(children, {
        ref: ref
      }) : <></>
    }
  </>
};

Animate.displayName = "Animate"

export default Animate;