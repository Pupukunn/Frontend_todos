import React, {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoContent from "./TodoContent";
import Menu from "../TodoComponent/Menu";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider } from '@toolpad/core/internal';
import NavBar from "../TodoComponent/NavBar";
const TodoList = () => {
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

        <TodoContent/>
      </div>
    </div>
  );
};

export default TodoList;
