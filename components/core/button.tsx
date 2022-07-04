import { ButtonHTMLAttributes, DetailedHTMLProps, FC, forwardRef } from "react";
import styles from "../../styles/core/button.module.scss"

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  shadow?: "none" | "block" 
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <button 
    {...props}
    ref={ref}
    className={`${props.shadow == "block" ? styles.shadow : ""} ${styles.container} ${props.className}`}
  >{props.children}</button>
});

Button.displayName = "Button";

export default Button;