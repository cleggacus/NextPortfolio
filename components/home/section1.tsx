import { FC } from "react";
import styles from "../../styles/home.module.scss"
import Button from "../core/button";
import Section, { SectionProps } from "../core/section";

const Section1: FC<SectionProps> = (props) => {
  return <Section {...props} className={styles.section1}>
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

    <div className={styles.subsection2}>
      <div className={styles.scrollIndicator}>
        <p>S C R O L L</p>
        <div></div>
      </div>
    </div>
  </Section>
}

export default Section1;