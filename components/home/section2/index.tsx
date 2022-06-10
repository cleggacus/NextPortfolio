import Link from "next/link";
import { FC } from "react";
import styles from "../../../styles/home/section2.module.scss"
import Box, {Animation} from "../../core/box";
import Button from "../../core/button";
import Section, { SectionProps } from "../../core/section";

const Section2: FC<SectionProps> = (props) => {
  const b1Animation: Animation = {
    type: ["down", "opacity"],
    amount: 600,
    from: -1000,
    to: -600

  }

  const b2Animation: Animation = {
    type: ["down", "opacity"],
    amount: 600,
    from: -900,
    to: -500
  }

  const b3Animation: Animation = {
    type: ["down", "opacity"],
    amount: 600,
    from: -800,
    to: -400
  }

  return <Section {...props} className={styles.container}>
    <div className={styles.cardsOuter}>
      <Box animate={b3Animation} className={styles.card}>
        <h1>WEB DEV</h1>

        <div>
          <p>Im a fullstack web developer with experience in NodeJS, TypeScript, React/NextJS, Express, MongoDB, SQL, CSS/SCSS and HTML.</p>
        </div>
      </Box>

      <Box animate={b2Animation} className={styles.card}>
        <h1>OTHER DEV</h1>

        <div>
          <p>Outside of web development I can program in C++ (11), C, Java, JavaScript and Python.<br/><br/>I am quick at learning new things and using prior knowledge in different situations.</p>
        </div>
      </Box>

      <Box animate={b1Animation} className={styles.card}>
        <h1>ALGORITHMS</h1>

        <div>
          <p>I have experience coding a variety of algorithms such as path findeing, map generation, sorting, searching and neural networks.</p>
        </div>

        <Link href="/algorithms">
          <Button noShadow>VIEW SOME HERE</Button>
        </Link>
      </Box>
    </div>
  </Section>
}

export default Section2;