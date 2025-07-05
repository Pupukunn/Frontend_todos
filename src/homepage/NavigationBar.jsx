import React from 'react'
import { NavLink } from 'react-router-dom';
const NavigationBar = () => {
  return (
    <div className='flex justify-between items-center mx-auto w-[80%]  py-10 max-w-[1000px]'>
        <h1 className='lg:text-7xl md:text-5xl text-3xl font-bold'>TODO</h1>
        <div className="flex  bg-[rgb(184,207,206)] rounded-2xl p-2">
            <NavLink to="/login" className="md:text-4xl  text-2xl border-r-2 md:px-7 px-5 py-3">
                LOGIN
            </NavLink>
             <NavLink to="/signup" className="md:text-4xl text-2xl md:px-7 px-5 py-3">
                SIGN UP
            </NavLink>
        </div>
    </div>
  )
}

export default NavigationBar