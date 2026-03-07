import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../pages/Shared/NavBar/NavBar'
import Footer from '../pages/Shared/Footer/Footer'

const RootLayout = () => {
  return (
    <div className='max-w-375 mx-auto'>
    <NavBar></NavBar>
      <Outlet></Outlet>
    <Footer></Footer>  
    </div>
  )
}

export default RootLayout
