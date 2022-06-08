import { FC, useEffect } from "react";
import styles from "../../styles/home.module.scss"
import Section, { SectionProps } from "../core/section";

const Section3: FC<SectionProps> = (props) => {
  useEffect(() => {
    props.setOnScroll(onScroll)
  }, [])


  const onScroll = (top: number) => {
    const parent = document.querySelector(`.${styles.section3}`) as HTMLDivElement;
    top -= parent.offsetTop;

    console.log(1+top/parent.clientHeight)


    if(props.setFlip) {
      if(top < -parent.clientHeight)
        props.setFlip(0)
      else 
        props.setFlip((top/parent.clientHeight)+1);
    }
  }

  return <Section {...props} className={styles.section3}>
  </Section>
}

export default Section3;