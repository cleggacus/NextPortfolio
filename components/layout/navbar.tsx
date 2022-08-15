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

  const downloadCV = () => {
    window.open("/CV.pdf", '_blank');
  }

  return <Box onTouchStart={stopPropergationTouch} onClick={stopPropergationMouse} className={`${styles.container} ${isOpen ? styles.open : styles.close}`} >
    <Link href="/">
      <Button shadow="none">HOME</Button>
    </Link>

    {/* <Link href="/algorithms">
      <Button noShadow>ALGORITHMS</Button>
    </Link> */}

    <Link href="/blog">
      <Button shadow="none">BLOG</Button>
    </Link>

    <Link href="https://mypastebin.vercel.app">
      <Button shadow="none">PASTE BIN</Button>
    </Link>

    <Link href="/contact">
      <Button shadow="none">CONTACT ME</Button>
    </Link>

    <Button onClick={downloadCV} shadow="none">DOWNLOAD CV</Button>
  </Box>
}

export default Navbar;