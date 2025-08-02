import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
const NavigationBar = () => {
  return (
    <div className='flex justify-between items-center mx-auto md:w-[80%] w-full p-4 h-20  '>
        <h1 className='md:text-5xl text-2xl font-bold text-shadow-2xs  text-black'>2DO</h1>
        <div className="flex gap-20">
        {/* <h1 className='text-3xl font-bold  text-black'>About</h1>
        <h1 className='text-3xl font-bold  text-black'>Contact</h1> */}
        </div>
        <Button className="flex shadow-lg " sx={{ color: 'white' , bgcolor: "black", padding : "0px", borderRadius :"1rem" , border: "1px solid black"  }}>
            <NavLink to="/login" className="lg:text-3xl md:text-2xl  text-xl  md:px-7 md:py-4  px-5 py-2 font-semibold">
                LOGIN
            </NavLink>
        </Button>
    </div>
  )
}

export default NavigationBar