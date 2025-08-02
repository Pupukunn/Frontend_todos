import React, {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SettingContent from "./SettingContent";
import Menu from "../TodoComponent/Menu";
import NavBar from "../TodoComponent/NavBar";
const SettingPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || token.trim() === "") {
      navigate("/login");
      return;
    }
    
  }, [token, navigate]);

  if (!token) return null;

  return (
    <div className="max-h-screen h-screen w-screen max-w-screen  overflow-hidden  bg-secondary font-primary ">
      <NavBar/>
      <div className="flex min-h-[100vh] w-screen max-w-screen">
        <Menu />
        <SettingContent/>
      </div>
    </div>
  );
};

export default SettingPage;
