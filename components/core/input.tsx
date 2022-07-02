import { DetailedHTMLProps, FC, forwardRef, HTMLAttributes, InputHTMLAttributes, MouseEventHandler, ReactNode, TouchEventHandler } from "react";
import styles from "../../styles/core/input.module.scss"

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input 
    {...props}
    ref={ref}
    className={`${styles.container} ${props.className}`}
  >{props.children}</input>
});

Input.displayName = "Input";

export default Input;