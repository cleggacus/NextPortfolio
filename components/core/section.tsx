import { CSSProperties, Dispatch, FC, forwardRef, ReactNode, SetStateAction, useEffect, useImperativeHandle, useRef } from "react"
import styles from "../../styles/core/sectiongroup.module.scss";

export type SectionProps = {
  children?: ReactNode,
  className?: string,
  setTop?: (top: number) => void,
  topOffsetPercent?: number,
  setOnScroll: (cb: ((top: number) => void)) => void,
  style?: CSSProperties
}

const Section = forwardRef<HTMLDivElement, SectionProps>(({ setTop, children, className, style, topOffsetPercent = 0 }, ref) => {
  const innerRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

  useEffect(() => {
    if(innerRef.current) {
      if(setTop)
        setTop(innerRef.current.offsetTop + innerRef.current.clientHeight * topOffsetPercent)
    }
  }, [innerRef.current?.clientHeight, innerRef.current?.clientTop]);

  return <div style={style} ref={innerRef} className={`${styles.section} ${className}`}>
    { children } 
  </div>
});

Section.displayName = "Section";

export default Section