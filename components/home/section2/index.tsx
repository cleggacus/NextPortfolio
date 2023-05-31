import Link from "next/link";
import { FC, useRef } from "react";
import styles from "../../../styles/home/section2.module.scss"
import Box from "../../core/box";
import Button from "../../core/button";
import Section, { SectionProps } from "../../core/section";

const Section2: FC<SectionProps> = (props) => { 
  const ref = useRef<HTMLDivElement>(null);

  return <Section {...props} ref={ref} topOffsetPercent={0.33} className={styles.container}>
    <Card1></Card1>
    <Card2></Card2>
    <Card3></Card3>
  </Section>
}

const Card1 = () => {
  return <div className={styles.cardOuter}>
    <Box className={styles.card}>
      <h1>Frontend</h1>

      <div>
        <p>When it comes to frontend I have experience in JavaScript, TypeScript, React & NextJS, SolidJS, SQL (MySQL & Postgres), CSS/SCSS and HTML.</p>
      </div>
    </Box>
  </div>
}

const Card2 = () => {
  return <div className={styles.cardOuter}>
    <Box className={styles.card}>
      <h1>Backend</h1>

      <div>
        <p>When it comes to backend I can program in Rust, JavaScipt, TypeScript, Java, C++ and GO (currenlty learning). I can use ExpressJS, ActixWeb and GraphQL (Apollo & Juniper)</p>
      </div>
    </Box>
  </div>
}

const Card3 = () => {
  return <div className={styles.cardOuter}>
    <Box className={styles.card}>
      <h1>Projects</h1>

      <div>
        <p>This website (the background on this site is astar and perlin noise). Notion style editor made with NextJS, Rust Juniper Backend and PostgreSQL database. JSON Parser in C. A Paste bin made with NextJS and TRPC. More on my GitHub.</p>
      </div>

      <Link href="https://github.com/cleggacus">
        <Button>GitHub</Button>
      </Link>
    </Box>
  </div>
}

export default Section2;
