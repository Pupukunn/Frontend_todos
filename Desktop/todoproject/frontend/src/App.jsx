
import Home from "./homepage/Home"
import SignUp from "./Signup/SignUp";
import Login from "./login/Login";
import TodoList from "./TodoPage/Todo";
import './App.css';
import { Routes, Route } from 'react-router-dom';
function App() {
 
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todos" element={<TodoList />} />
    </Routes>
  )
}

export default App
