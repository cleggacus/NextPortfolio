import { CSSProperties, Dispatch, FC, forwardRef, ReactNode, SetStateAction, useEffect, useImperativeHandle, useRef } from "react"
import styles from "../../styles/core/sectiongroup.module.scss";

export type SectionProps = {
  children?: ReactNode,
  className?: string,
  setTop?: (top: number) => void,
  setOnScroll: (cb: ((top: number) => void)) => void,
  style?: CSSProperties
}

const Section = forwardRef<HTMLDivElement, SectionProps>(({ setTop, children, className, style }, ref) => {
  const innerRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

  useEffect(() => {
    if(innerRef.current) {
      if(setTop)
        setTop(innerRef.current.offsetTop)
    }
  }, [ref]);

  return <div style={style} ref={innerRef} className={`${styles.section} ${className}`}>
    { children } 
  </div>
});

Section.displayName = "Section";

export default Section