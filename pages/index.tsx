import type { NextPage } from 'next'
import SectionGroup from '../components/core/sectiongroup'
import Section1 from '../components/home/section1'
import Section2 from '../components/home/section2'
import createAstar from '../utils/canvas/createAstar'

const Home: NextPage = () => {  
  createAstar();

  return (
    <SectionGroup sections={[
      Section1,
      Section2
    ]}></SectionGroup>
  )
}

export default Home
