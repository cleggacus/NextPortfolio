import { FC, MouseEventHandler, ReactNode, TouchEventHandler, useEffect, useState } from "react";
import { Menu } from "@styled-icons/boxicons-regular";
import styles from "../../styles/layout.module.scss"
import Button from "../core/button";
import { StoreProvider } from "../../store";
import Navbar from "./navbar";
import Head from "next/head";

type LayoutProps = {
  children?: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    window.addEventListener("click", () => {
      setOpen(false);
    })

    window.addEventListener("touchstart", () => {
      setOpen(false);
    })
  }, [])


  const toggleMenu: MouseEventHandler = e => {
    setOpen(!isOpen);
    e.stopPropagation();
  }

  const touch: TouchEventHandler = e => {
    e.stopPropagation();
  }

  return <StoreProvider>
    <Head>
      <title>Liam Clegg Portfolio</title>
      <meta name="google-site-verification" content="3TWlMtTbXwzc_DEwdD0GPxai7TryXaSKAyYExdqLW9M" />
      <meta name="description" content="Liam Clegg (Web Developer and Software Engineer) Portfolio. @cleggacus." />
      <meta name="keywords" content="portfolio, web developer, software engineer, frontend developer, backend developer, fullstack developer, liam clegg, clegg, liam, liamclegg, cleggacus, programmer, developer, computer science, swansea, london, swansea university" />
      <meta name="author" content="Liam Clegg" />
      <meta name="robots" content="index, follow" />
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      

    </Head>


    <div className={styles.container}>
      <div className={styles.containerInner}>
        <div className={styles.content}>
          { children }
        </div>

        <div className={styles.fader}></div>

        <div className={styles.info}>
          <p>@cleggacus / made with next.js</p>
        </div>

        <div className={styles.menuTitle}>
          <h2>WELCOME</h2>
          <h2>FRIEND</h2>
        </div>

        <Navbar isOpen={isOpen} ></Navbar>

        <Button shadow="block" onTouchStart={touch} onClick={toggleMenu} className={styles.menuIcon}>
          <Menu/>
        </Button>
      </div>
    </div>
  </StoreProvider>
  
}

export default Layout;
