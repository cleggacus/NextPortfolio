import { FC, ReactNode } from "react"

import styles from "../../styles/popup.module.scss"
import { Close } from "@styled-icons/material";
import { ExpandAlt } from "@styled-icons/boxicons-regular"
import Box from "../core/box";

type PopupProps = {
  children?: ReactNode
}

const Popup: FC<PopupProps> = ({ children }) => {
  return <div className={styles.container}>
    <Box className={styles.innerContainer}>
      <div className={styles.header}>
        <div className={styles.buttons}>
          <div className={styles.button1}><Close/></div>
          <div className={styles.button2}><ExpandAlt/></div>
        </div>

        <div className={styles.title}>
          <h3>TITLE HERE</h3>
        </div>
      </div>

      { children }
    </Box>
  </div>
}

export default Popup