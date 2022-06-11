import { FC, useEffect, useRef, useState } from "react";
import styles from "../../../styles/home/section1.module.scss"
import Animate from "../../core/animate";
import Button from "../../core/button";
import Section, { SectionProps } from "../../core/section";

const Section1: FC<SectionProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  const fromBack = {
    scroll: -30,
    opacity: 1,
  }

  const toBack = {
    scroll: -30 + 500,
    opacity: 0,
  }

  const from = {
    scroll: -30,
    opacity: 1,
    y: 0,
    scale: 1
  }

  const to = {
    scroll: -30 + 500,
    opacity: 0,
    y: 300,
    scale: 0.5
  }
  
  return <Section ref={ref} {...props} className={styles.section1}>
    <Animate from={fromBack} to={toBack} >
      <div className={styles.backCover}></div>
    </Animate>

    <Animate from={from} to={to} >
      <div className={styles.subsection1}>
        <div className={styles.container1}>
          <div>
            <p>Hi there, my name is</p>
            <h1>Liam Clegg</h1>
            <p>I&apos;m a <span className={styles.bold}>software engineer</span> and <span className={styles.bold}>fullstack web developer</span> who likes to bring unique and interesting projects to life.</p>
            <Button>Download CV</Button>
          </div>
        </div>

        <div className={styles.container2}>
          <div className={styles.back}></div>
          <img src="/profile1.png"></img>
        </div>
      </div>
    </Animate>

    <div className={styles.subsection2}>
      <div className={styles.scrollIndicator}>
        <p>S C R O L L</p>
        <div></div>
      </div>
    </div>
  </Section>
}

export default Section1;