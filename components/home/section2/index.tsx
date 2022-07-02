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
      <h1>WEB DEV</h1>

      <div>
        <p>Im a fullstack web developer with experience in NodeJS, TypeScript, React/NextJS, Express, MongoDB, SQL, CSS/SCSS and HTML.</p>
      </div>
    </Box>
  </div>
}

const Card2 = () => {
  return <div className={styles.cardOuter}>
    <Box className={styles.card}>
      <h1>OTHER DEV</h1>

      <div>
        <p>Outside of web development I can program in C++ (11), C, Java, JavaScript and Python.<br/><br/>I am quick at learning new things and using prior knowledge in different situations.</p>
      </div>
    </Box>
  </div>
}

const Card3 = () => {
  return <div className={styles.cardOuter}>
    <Box className={styles.card}>
      <h1>ALGORITHMS</h1>

      <div>
        <p>I have experience coding a variety of algorithms such as path findeing, map generation, sorting, searching and neural networks. In the background is map generated with perlin noise and A* path finder.</p>
      </div>

      {/* <Link href="/algorithms">
        <Button noShadow>VIEW SOME HERE</Button>
      </Link> */}
    </Box>
  </div>
}

export default Section2;