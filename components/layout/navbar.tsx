import Link from "next/link";
import { FC, MouseEventHandler, TouchEventHandler, useState } from "react";
import styles from "../../styles/navbar.module.scss"
import Box from "../core/box";
import Button from "../core/button";

type NavbarProps = {
  isOpen: boolean
}

const Navbar: FC<NavbarProps> = ({ isOpen }) => {
  const stopPropergationMouse: MouseEventHandler = e => {
    e.stopPropagation();
  }

  const stopPropergationTouch: TouchEventHandler = e => {
    e.stopPropagation();
  }

  return <Box onTouchStart={stopPropergationTouch} onClick={stopPropergationMouse} className={`${styles.container} ${isOpen ? styles.open : styles.close}`} >
    <Link href="/">
      <Button noShadow>HOME</Button>
    </Link>

    {/* <Link href="/algorithms">
      <Button noShadow>ALGORITHMS</Button>
    </Link> */}

    {/* <Link href="/blog">
      <Button noShadow>BLOG</Button>
    </Link> */}

    <Link href="/contact">
      <Button noShadow>CONTACT ME</Button>
    </Link>

    <Button noShadow>DOWNLOAD CV</Button>
  </Box>
}

export default Navbar;