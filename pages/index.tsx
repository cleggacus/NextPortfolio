import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import SectionGroup from '../components/core/sectiongroup'
import Section1 from '../components/home/section1'
import Section2 from '../components/home/section2'
import Section3 from '../components/home/section3'
import Layout from '../components/layout'

const Home: NextPage = () => {  
  const [flip, setFlip] = useState(0);

  return (
    <>
    <Layout flipped={flip}>
      <SectionGroup setFlip={setFlip} sections={[
        Section1,
        Section2,
        Section3
      ]}></SectionGroup>
    </Layout>
    </>
  )
}

export default Home
