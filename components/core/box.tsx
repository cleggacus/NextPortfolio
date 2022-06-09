import { FC, ReactNode } from "react"

import styles from "../../styles/core/box.module.scss"

type BoxProps = {
  children?: ReactNode,
  className?: string
}

const Box: FC<BoxProps> = ({ children, className }) => {
  return <div className={`${styles.container} ${className}`}>
    { children }
  </div>
}

export default Box