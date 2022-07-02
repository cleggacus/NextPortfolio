import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes } from "react";
import styles from "../../styles/core/textarea.module.scss"

type TextareaProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  return <textarea 
    {...props}
    ref={ref}
    className={`${styles.container} ${props.className}`}
  >{props.children}</textarea>
});

Textarea.displayName = "Textarea";

export default Textarea;