import React from 'react'
import NavigationBar from './NavigationBar'
import Footer from '../component/Footer'
import { NavLink } from 'react-router-dom';
const Home = () => {
  return (
    <div className='relative flex flex-col justify-between h-screen w-screen bg-[#EAEFEF] overflow-x-hidden'>
        <NavigationBar/>
        <div className="max-w-[600px] flex flex-col items-center rounded-xl mx-auto my-20 w-[80%] bg-[#7F8CAA] text-white">
            <h1 className='text-4xl font-semibold p-5'>TODO WEB2025 </h1>
            <p className='text-center text-2xl px-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sit, earum neque aliquam cumque rerum molestiae obcaecati harum odit explicabo dolore illum eligendi. Fugiat, totam? Nulla laboriosam ab saepe atque.</p>
            <NavLink to='/signup' className='cursor-pointer rounded-2xl bg-[#333446] px-8 py-4 my-8 text-2xl'>GET STARTED</NavLink>
        </div>
         <Footer/>
    </div>
  )
}

export default Home