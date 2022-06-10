import { FC, forwardRef, MouseEventHandler, ReactNode, TouchEventHandler } from "react";
import styles from "../../styles/core/button.module.scss"

type ButtonProps = {
  children?: ReactNode,
  className?: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  onTouchStart?: TouchEventHandler<HTMLButtonElement>,
  noShadow?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, onClick, onTouchStart, noShadow }, ref) => {
  return <button 
    ref={ref}
    onClick={onClick} 
    onTouchStart={onTouchStart}
    className={`${noShadow ? "" : styles.shadow} ${styles.container} ${className}`}
  >{children}</button>
});

export default Button;