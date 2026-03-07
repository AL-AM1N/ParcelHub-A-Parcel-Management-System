import React from 'react'
import Banner from '../Banner/Banner'
import OurServices from '../OurServices/OurServices'
import ClientLogosMarquee from '../ClientLogosMarquee/ClientLogosMarquee'
import Benefits from '../Benefits/Benefits'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <OurServices></OurServices>
      <ClientLogosMarquee></ClientLogosMarquee>
      <Benefits></Benefits>
    </div>
  )
}

export default Home
