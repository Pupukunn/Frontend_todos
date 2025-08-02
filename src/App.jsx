
import WelcomePage from "./WelcomePage/WelcomePage"
import SignUp from "./Signup/SignUp";
import Login from "./login/Login";
import TodoPage from "./TodoPage/TodoHomePage/Todo";
import Setting from "./TodoPage/SettingPage/Setting";
import { Routes, Route } from 'react-router-dom';

import DashboardLayoutSidebarCollapsed from "./TodoPage/TodoHomePage/TodoContent";
function App() {
 
  return (
    
    <Routes>
      <Route path="/" element={<WelcomePage/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todos" element={<TodoPage />} />
      <Route path="/todos/setting" element={<Setting/>} />
   
    </Routes>
 
  )
}

export default App
