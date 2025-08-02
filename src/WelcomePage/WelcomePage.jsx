import React from "react";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
const WelcomePage = () => {
  return (
    <div
      className="bg-secondary bg-cover bg-no-repeat flex justify-between h-screen w-screen  overflow-x-hidden"
      style={{ backgroundImage: `url(/src/assets/welcome.jpg)` }}
    >
      <div className="md:p-10 p-5 w-full">
        <div className=" w-full h-full bg-transparent rounded-2xl  backdrop-blur-sm md:p-0 flex flex-col items-center mgap-40">
          <NavigationBar />
          <div className=" gap-10  flex flex-col   items-center left-auto  justify-center rounded-xl m-auto md:px-15 px-5   ">
            <h1 className="lg:text-6xl text-4xl font-bold">WELCOME</h1>
            <p className="text-center md:text-xl  ">
              Master your day with Todo! Plan tasks, track progress, and achieve
              your goals effortlessly!
            </p>
            <Button
              className="flex shadow-lg "
              sx={{
                color: "white",
                bgcolor: "black",
                padding: "0px",
                borderRadius: "1rem",
                border: "1px solid black",
              }}
            >
              <NavLink
                to="/login"
                className="lg:text-3xl md:text-2xl  text-xl  md:px-7 md:py-4  px-5 py-4 font-semibold"
              >
                Get Started
              </NavLink>
            </Button>
          </div>
          {/* <img src="../src/assets/snowman.png" alt="" className="w-150 fixed -left-10 -bottom-10" /> */}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
