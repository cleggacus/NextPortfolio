import { FC, MouseEventHandler, ReactNode, TouchEventHandler } from "react";
import styles from "../../styles/core/button.module.scss"

type ButtonProps = {
  children?: ReactNode,
  className?: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  onTouchStart?: TouchEventHandler<HTMLButtonElement>,
  noShadow?: boolean
}

const Button: FC<ButtonProps> = ({ children, className, onClick, onTouchStart, noShadow }) => {
  return <button 
    onClick={onClick} 
    onTouchStart={onTouchStart}
    className={`${noShadow ? "" : styles.shadow} ${styles.container} ${className}`}
  >{children}</button>
}

export default Button;