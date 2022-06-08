import { FC, useEffect, useRef, useState } from "react";
import styles from "../../styles/home.module.scss"
import Box from "../core/box";
import Section, { SectionProps } from "../core/section";

const Section2: FC<SectionProps> = (props) => {
  const b1 = useRef<HTMLDivElement>(null);
  const b2 = useRef<HTMLDivElement>(null);
  const b3 = useRef<HTMLDivElement>(null);
  const b4 = useRef<HTMLDivElement>(null);
  const b5 = useRef<HTMLDivElement>(null);
  const b6 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    props.setOnScroll(onScroll);
  }, [])

  const onScroll = (top: number) => {
    const parent = document.querySelector(`.${styles.section2}`) as HTMLDivElement;

    top -= parent.offsetTop;

    const p1Start = -400;
    const p2Start = -500;
    const p3Start = -600;

    const p4Start = -400 + parent.clientHeight/2;
    const p5Start = -500 + parent.clientHeight/2;
    const p6Start = -600 + parent.clientHeight/2;

    scrollElem(top, p1Start, b1.current);
    scrollElem(top, p2Start, b2.current);
    scrollElem(top, p3Start, b3.current);
    scrollElem(top, p4Start, b4.current);
    scrollElem(top, p5Start, b5.current);
    scrollElem(top, p6Start, b6.current);
  }

  const scrollElem = (top: number, start: number, elem: HTMLDivElement | null) => {
    const durationO = 300;
    const durationT = 400;

    const translate = -800;

    if(elem) {
      if(top < start) {
        elem.style.opacity = `0`;
      } else if(top >= start && top <= start+durationO) {
        const percent = ((top-start) / durationO);
        elem.style.opacity = `${percent}`;
      } else {
        elem.style.opacity = `1`;
      }

      if(top < start) {
        elem.style.transform = `translate(0, ${translate}px)`;
      } else if(top >= start && top <= start+durationT) {
        const percent = ((top-start) / durationT);
        elem.style.transform = `translate(0, ${(1-percent)*translate}px)`;
      } else {
        elem.style.transform = `translate(0, 0px)`;
      }
    }
  }

  return <Section {...props} className={styles.section2}>
    <div className={styles.content}>
      <div className={styles.subcontent}>
        <div ref={b1} style={{opacity: 0}}>
          <Box>
            <h1>1</h1>
          </Box>
        </div>

        <div ref={b2} style={{opacity: 0}}>
          <Box>
            <h1>2</h1>
          </Box>
        </div>

        <div ref={b3} style={{opacity: 0}}>
          <Box>
            <h1>3</h1>
          </Box>
        </div>
      </div>

      <div className={styles.subcontent}>
        <div ref={b4} style={{opacity: 0}}>
          <Box>
            <h1>4</h1>
          </Box>
        </div>

        <div ref={b5} style={{opacity: 0}}>
          <Box>
            <h1>5</h1>
          </Box>
        </div>

        <div ref={b6} style={{opacity: 0}}>
          <Box>
            <h1>6</h1>
          </Box>
        </div>
      </div>
    </div>
  </Section>
}

export default Section2;