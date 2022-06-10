import { CSSProperties, Dispatch, FC, ReactNode, SetStateAction, useEffect, useRef } from "react"
import styles from "../../styles/core/sectiongroup.module.scss";

export type SectionProps = {
  children?: ReactNode,
  className?: string,
  setTop?: (top: number) => void,
  setOnScroll: (cb: ((top: number) => void)) => void,
  style?: CSSProperties
}

const Section: FC<SectionProps> = ({ setTop, children, className, style }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(ref?.current) {
      if(setTop)
        setTop(ref.current.offsetTop)
    }
  }, [ref]);

  return <div style={style} ref={ref} className={`${styles.section} ${className}`}>
    { children } 
  </div>
}

export default Section