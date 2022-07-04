import type { NextPage } from 'next'
import { useEffect, useRef } from 'react'
import SectionGroup from '../components/core/sectiongroup'
import Section1 from '../components/home/section1'
import Section2 from '../components/home/section2'
import styles from "../styles/home/home.module.scss"
import createAstar, { stopAstar } from '../utils/canvas/createAstar'

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if(canvasRef.current) {
      createAstar(canvasRef.current)
    }
  }, [canvasRef]);

  useEffect(() => {
    return stopAstar;
  }, []);

  return <>
    <canvas ref={canvasRef} className={styles.canvasElem}/>
    <SectionGroup sections={[
      Section1,
      Section2
    ]}></SectionGroup>
  </>
}

export default Home
