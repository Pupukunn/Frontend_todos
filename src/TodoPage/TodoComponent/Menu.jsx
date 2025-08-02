import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";



const Menu = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavigation = (path) => {
    if (path === "/login") {
      handleLogout();
    } else {
      navigate(path);
    }
  };
    const NAVIGATION2 = [
  { title: "", icon : <MenuOutlinedIcon   />  } , 
];
  const NAVIGATION = [
    { path: "/todos", title: "Home", icon: <HomeOutlinedIcon /> }, 
  // { path: "/todos/today", title: "Today", icon: <TodayOutlinedIcon /> },
  // {
  //   path: "/todos/calendar",
  //   title: "Calendar",
  //   icon: <CalendarMonthOutlinedIcon />,
  // },
  // {
  //   path: "/todos/stickywall",
  //   title: "StickyWall",
  //   icon: <StickyNote2OutlinedIcon />,
  // },
  { path: "/todos/setting", title: "Setting", icon: <SettingsOutlinedIcon /> },
  {
    path: "/login",
    title: "LogOut",
    icon: <LoginOutlinedIcon />,
    isLogout: true,
  },
];

  return (
    <div className="shadow-2xl  ">
    <div
      className={`flex lg:mx-5 mx-2   transition-all duration-300 ease-in-out  ${
        isCollapsed ? "lg:w-20 w-10" : "lg:w-50 md:w-35 w-25"
        
      }`
      
    }
    style={{height: "calc(100vh - 64px)"}}
    >
      <div className="flex flex-col items-center  w-full ">
        
        <div className="flex flex-col justify-between items-center w-full h-full lg:my-10 my-4 px-auto overflow-y-auto overflow-x-hidden ">
        {NAVIGATION2.map((item) => (
            <Button
            
              onClick={() => toggleMenu()}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: { xs: "24px", lg: "32px" },
                  height: {lg:"45px" ,xs:"40px"},
                },
                width: "100%",
                display: "flex",
                alignItems : "center",
                justifyContent: isCollapsed ? "center" : "flex-start",
                // marginX: '2rem',
                color: "#4a5565",
                marginY: { xl: "4px", xs: "6px" },
                paddingY : { xl: "12px", xs: "6px"} ,
                paddingX: isCollapsed ? 0 : 0,
                fontSize: { lg: "18px", xs: "0.75rem" },
                fontWeight: "bold",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
              }}
              className="cursor-pointer"
            >
              <span
                className={`flex  ${
                  isCollapsed ? "mr-0" : "lg:mx-4 md:mx-3 mx-2"
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`transition-opacity duration-300 py-auto  ${
                  isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100 w-auto"
                }`}
              >
                {item.title}
              </span>
            </Button>
          ))}
          {NAVIGATION.map((item) => (
            <Button
              key={item.path || item.button}
              onClick={() => handleNavigation(item.path)}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: { xs: "24px", lg: "32px" },
                  height: {lg:"45px" ,xs:"40px"},
                },
                width: "100%",
                display: "flex",
                alignItems : "center",
                justifyContent: isCollapsed ? "center" : "flex-start",
                // marginX: '2rem',
                color: "#4a5565",
                marginY: { xl: "4px", xs: "6px" },
                paddingY : { xl: "12px", xs: "6px"} ,
                paddingX: isCollapsed ? 0 : 0,
                fontSize: { xl: "20px", lg: "18px", xs: "0.75rem" },
                fontWeight: "bold",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
              }}
              className="cursor-pointer"
            >
              <span
                className={`flex  ${
                  isCollapsed ? "mr-0" : "lg:mx-4 md:mx-3 mx-2"
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`transition-opacity duration-300 py-auto  ${
                  isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                }`}
              >
                {item.title}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Menu;