import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";


const TodoContent = () => {
  const [expandedTodos, setExpandedTodos] = useState({});
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || token.trim() === "") {
      navigate("/login");
      return;
    }

    const loadTodos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/todos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos(res.data);
      } catch (err) {
        console.error("Error fetching todos:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };
    loadTodos();
  }, [token, navigate]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:3000/todos",
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos([...todos, res.data]);
      setTitle("");
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการเพิ่มงาน:", err);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/todos/${id}`,
        { completed: !completed },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos(todos.map((todo) => (todo.todo_id === id ? res.data : todo)));
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการอัปเดตงาน:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };



  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };


  return (
    <div className="p-5 lg:p-10 w-full transition-all duration-300 ease-in-out overflow-y-auto box" style={{ height: "calc(100vh - 64px)" }}>
      <div className="flex flex-col overflow-auto w-full h-full">
        <form
          onSubmit={addTask}
          className="flex w-full items-center py-3 border-2 rounded-xl border-gray-300 shadow "
          sx={{ boxShadow: "none" }}
        >
          <IconButton type="submit" className="cursor-pointer" sx={{ color: "inherit",  marginX: {xs:"0.75rem", md:"1rem", lg:"1.25rem"} , padding: { xs: "0.5rem", lg: "0.5rem" }   }}>
            <AddOutlinedIcon className="text-gray-500" sx={{  fontSize: { xs: "1rem", md: "1.25rem",  lg: "1.5rem" } }} />
          </IconButton>
          <InputBase
            type="text"
            placeholder="Add New task"
            className="text-2xl font-semibold outline-none mr-6 w-full font-primary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              "& .MuiInputBase-input::placeholder": {
                fontFamily: "Roboto, Arial, sans-serif",
                color: "#757575",
              },
              fontSize: { xs: "0.75rem", md:"1rem" ,  lg: "1.25rem" },
            }}
          />
        </form>
      
        {todos.map((todo) => (
          <div className={`flex-col w-full mt-4 rounded-xl border-2 border-gray-300 shadow  cursor-pointer hover:bg-gray-100  text-[0.75rem] md:text-[1rem]  lg:text-[1.25rem]}, ${
              todo.completed ? "bg-gray-100 rounded-2xl" : ""
            } `}>
         
          <div
            key={todo.todo_id}
            className={` py-3 flex items-center justify-between  `}
          >
            <div className="flex items-center w-full ">
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(todo.todo_id, todo.completed)}
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: { xs: "1rem", md: "1.25rem", lg: "1.5rem" },
                  },
                  "&.Mui-checked": {},
                  marginX: {xs:"0.75rem", md:"1rem", lg:"1.25rem"},
                  padding: "0.5rem"
                }}
              />
              <div
                className=" lg:text-[1.5rem] md:text-[1.25rem] text-[1rem] text-gray-600 font-primary"
                style={{
                  // ปรับให้เหลือพื้นที่สำหรับไอคอนขยายและลบ
                  wordBreak: "break-word", // ตัดคำและขึ้นบรรทัดใหม่
                  whiteSpace: "normal", // อนุญาตให้ขึ้นบรรทัดใหม่
                }}
              >
                {expandedTodos[todo.todo_id] ? todo.title : truncateText(todo.title, 500)}
                {/* <div className="lg:text-[1rem] md:text-[0.75rem] text-[0.5rem] font-bold">งาน</div> */}
              </div>
            </div>
            <div className="flex items-center">
             
              <IconButton
                onClick={() => deleteTodo(todo.todo_id)}
                className="cursor-pointer"
                sx={{  marginX: {xs:"0.75rem", md:"1rem", lg:"1.25rem"}, padding: { xs: "0.5rem", lg: "0.5rem" } }}
              >
                <DeleteOutlineOutlinedIcon sx={{ fontSize: { xs: "1rem", md: "1.25rem",  lg: "1.5rem" } }} />
              </IconButton>
            </div>
          </div>
          </div>
        ))}
      
      </div>
    </div>
  );
};

export default TodoContent;