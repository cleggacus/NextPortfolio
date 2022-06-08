import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "../../styles/button.module.scss"

type ButtonProps = {
  children?: ReactNode,
  className?: string
}

const Button: FC<ButtonProps> = ({ children, className }) => {
  return <button className={`${styles.container} ${className}`}>{children}</button>
}

export default Button;