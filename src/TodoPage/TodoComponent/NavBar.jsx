import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CgProfile } from "react-icons/cg";
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider } from '@toolpad/core/internal';
import { Avatar } from '@mui/material';
const NavBar = () => {
  return (
     <div className="font-primary flex md:justify-between justify-evenly  items-center md:gap-10   bg-third shadow  h-16  ">
                <h1 className="md:w-[160px] lg:text-4xl md:text-2xl text-xl font-bold  text-secondary font-primary   md:px-10  ">2DO</h1>
                <div className="flex  basis-2/4   items-center">
                  {/* <Paper
                  component="form"
                    onSubmit=""
                    className={
                      "flex rounded-xl shadow items-center px-4 py-1 ` mx-auto max-w-[480px] w-full "
                    }
                  >
                    <IconButton className="" type="submit">
                      <SearchIcon className=" text-gray-500" sx={{ fontSize: '1.25rem' }} />
                    </IconButton>
                    <InputBase
                      type="text"
                      placeholder="Search"
                      className=" lg:pl-4 lg:text-2xl w-full mx-auto font-semibold outline-none "
                      sx={{  "& .MuiInputBase-input::placeholder": {
                      fontFamily: "Roboto, Arial, sans-serif", // Match MUI and Tailwind
                      fontSize: { xs: "16px", md: "20px" },
                      color: "#757575",
                    }, fontSize: { xs: '1rem', lg: '1rem' } }} // กำหนดขนาดตาม breakpoint
                    />
                  </Paper> */}
                </div>
                {/* <div className=" md:px-10 md:w-[160px]">
                  <Avatar alt="" src="/static/images/avatar/1.jpg" className=' ' />
                  </div> */}
              </div>
  )
}

export default NavBar