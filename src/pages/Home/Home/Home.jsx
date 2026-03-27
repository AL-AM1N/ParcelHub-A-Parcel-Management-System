import React from 'react'
import Banner from '../Banner/Banner'
import OurServices from '../OurServices/OurServices'
import ClientLogosMarquee from '../ClientLogosMarquee/ClientLogosMarquee'
import Benefits from '../Benefits/Benefits'
import HowItWorks from '../HowItWorks/HowItWorks'
import FAQ from '../FAQ/FAQ'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <OurServices></OurServices>
      <ClientLogosMarquee></ClientLogosMarquee>
      <Benefits></Benefits>
      <FAQ></FAQ>
    </div>
  )
}

export default Home
