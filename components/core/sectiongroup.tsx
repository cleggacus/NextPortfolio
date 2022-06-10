import { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { SectionProps } from "./section";
import styles from "../../styles/core/sectiongroup.module.scss"
import { StoreContext } from "../../store";

type SectionLayoutProps = {
  sections: FC<SectionProps>[];
}

const SectionGroup: FC<SectionLayoutProps> = ({ sections }) => {
  // current section that is in view
  const [currentPage, setCurrentPage] = useState(0);
  // where the sections are on the page
  const [pageBreaks, setPageBreaks] = useState((new Array(sections.length)).fill(0));

  const [, dispatch] = useContext(StoreContext);

  const ref = useRef<HTMLDivElement>(null);

  // updates the array of page breaks (where each section is)
  const setPageBreak = (index: number, value: number) => {
    const breaks = pageBreaks;
    breaks[index] = value;
    setPageBreaks(breaks);
  }

  // calls a callback function when scroll event is run
  const setOnScroll = (cb: ((top: number) => void)) => {
    if(ref.current) {
      ref.current.addEventListener("scroll", e => {
        cb(ref.current?.scrollTop || 0);
      })
    }
  }

  // used for setting current page based scroll top val
  useEffect(() => {
    if(ref.current) {
      dispatch({
        type: "setOnScroll",
        payload: (cb: (elem: HTMLDivElement) => void) => {
          if(ref.current)
            ref.current.addEventListener("scroll", e => {
              if(ref.current)
                cb(ref.current);
            })
        }
      })
    }

    setOnScroll(top => {
      const halfHeight = (ref.current?.clientHeight || 0) / 2;

      for(let i = pageBreaks.length-1; i >= 0; i--) {
        if(top >= pageBreaks[i] - halfHeight) {
          setCurrentPage(i);
          break;
        }
      }
    })
  }, [ref])

  // scrolls to page[i]
  const scroll = (i: number) => {
    ref.current?.scroll(
      {
        top: pageBreaks[i]
      }
    );
  }

  return (
  <div ref={ref} className={styles.sectionGroup}>
      {
        sections.map((Section, i) => 
          <Section 
            style={{zIndex: (i)}} 
            key={i} 
            setOnScroll={setOnScroll} 
            setTop={top => setPageBreak(i, top)}
          ></Section>
        )
      }

      <div className={styles.scroller}>
        {
          pageBreaks.map((_val, i) => 
            <div 
              onClick={ () => scroll(i) } 
              key={i} 
              className={currentPage == i ? styles.active : ""}
            ></div>
          )
        }
      </div>
    </div>
  )
}

export default SectionGroup