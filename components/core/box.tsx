import { DetailedHTMLProps, FC, forwardRef, HTMLAttributes, MouseEventHandler, ReactNode, TouchEventHandler, useContext, useEffect, useRef, useState } from "react"
import { StoreContext } from "../../store"

import styles from "../../styles/core/box.module.scss"

type Animation = {
  type: ("down" | "up" | "opacity")[],
  amount: number,
  from: number,
  to: number
}

type BoxProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  animate?: Animation
}

const Box = forwardRef<HTMLDivElement, BoxProps>(( props, ref ) => { 
  return <div {...props} ref={ref} className={`${styles.container} ${props.className}`}>
    { props.children }
  </div>
});

Box.displayName = "Box";

export default Box

export type {
  Animation
}