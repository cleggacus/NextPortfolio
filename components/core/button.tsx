import { ButtonHTMLAttributes, DetailedHTMLProps, FC, forwardRef } from "react";
import styles from "../../styles/core/button.module.scss"

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  noShadow?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <button 
    {...props}
    ref={ref}
    className={`${props.noShadow ? "" : styles.shadow} ${styles.container} ${props.className}`}
  >{props.children}</button>
});

Button.displayName = "Button";

export default Button;