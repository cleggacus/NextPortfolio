import { FC, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { Menu } from "@styled-icons/boxicons-regular";
import styles from "../../styles/layout.module.scss"
import Button from "../core/button";
import Dots from "./dots";

type LayoutProps = {
  children?: ReactNode,
  flipped?: number
}

const Layout: FC<LayoutProps> = ({ children, flipped }) => {
  const getFlipped = () => {
    if(flipped == undefined)
      return 0;

    if(flipped >= 1)
      return 1;

    if(flipped <= 0)
      return 0;

    return flipped;
  }

  return <div style={{ backgroundPosition: `0 ${(getFlipped())*100}%` }} className={`${styles.container} ${getFlipped() > 0.5 ? styles.flipped : ""}`}>
    <div style={{ backgroundPosition: `0 ${(getFlipped())*100}%` }} className={styles.containerInner}>
      <Dots></Dots>

      <div className={styles.info}>
        <p>@cleggacus / made with next.js</p>
      </div>

      <div className={styles.content}>
        { children }
      </div>

      <div className={styles.menuTitle}>
        <h2>WELCOME</h2>
        <h2>FRIEND</h2>
      </div>

      <Button className={styles.menuIcon}>
        <Menu/>
      </Button>
    </div>
  </div>
}

export default Layout;
