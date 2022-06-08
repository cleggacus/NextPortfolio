import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { SectionProps } from "./section";
import styles from "../../styles/sectiongroup.module.scss"

type SectionLayoutProps = {
  sections: FC<SectionProps>[];
  setFlip?: Dispatch<SetStateAction<number>>
}

const SectionGroup: FC<SectionLayoutProps> = ({ sections, setFlip }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageBreaks, setPageBreaks] = useState((new Array(sections.length)).fill(0));

  const ref = useRef<HTMLDivElement>(null);

  const setPageBreak = (index: number, value: number) => {
    const breaks = pageBreaks;
    breaks[index] = value;
    setPageBreaks(breaks);
  }

  const setOnScroll = (cb: ((top: number) => void)) => {
    if(ref.current) {
      ref.current.addEventListener("scroll", () => {
        const top= 
          (ref.current ? 
            (ref.current.scrollTop) :  
            0
          );

        cb(top);
      })
    }
  }

  useEffect(() => {
    setOnScroll(top => {
      if(ref.current)
        top -= ref.current.clientHeight;

      for(let i = 0; i < pageBreaks.length; i++) {
        if(pageBreaks[i] > top) {
          setCurrentPage(i);
          break;
        }
      }
    })
  }, [ref])

  const scroll = (i: number) => {
    ref.current?.scrollTo(
      {
        top: pageBreaks[i],
        behavior: 'smooth',
      }
    );
  }

  return (
  <div ref={ref} className={styles.sectionGroup}>
      {
        sections.map((Section, i) => 
          <Section style={{zIndex: (sections.length-i)}} setFlip={setFlip} key={i} setOnScroll={setOnScroll} setTop={top => setPageBreak(i, top)}></Section>
        )
      }

      <div className={styles.scroller}>
        {
          pageBreaks.map((val, i) => 
            <div onClick={
              () => scroll(i)
            } key={i} className={currentPage == i ? styles.active : ""}></div>
          )
        }
      </div>
    </div>
  )
}

export default SectionGroup