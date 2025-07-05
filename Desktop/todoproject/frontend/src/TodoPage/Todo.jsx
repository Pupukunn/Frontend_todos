import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMenu , IoSearchSharp  } from "react-icons/io5";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

useEffect(() => {
  if (!token || token.trim() === '') {
    navigate('/login');
    return;
  }
  const loadTodos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/todos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };
  loadTodos();
}, [token, navigate]);


  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/todos', { title }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos([...todos, res.data]);
      setTitle('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      await axios.put(`http://localhost:3000/todos/${id}`, { completed: !completed }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.map(todo => todo.todo_id === id ? { ...todo, completed: !completed } : todo));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-white ">
      <div className="flex min-h-[100vh]">
        <div className="flex flex-col bg-gray-100 m-4 rounded-2xl min-w-[360px] min-h-full">

          <div className="flex justify-between mx-4 mt-6">
            <h1 className='lg:text-4xl font-semibold text-gray-600'>Menu</h1>
            <button className='cursor-pointer'>
            <IoMenu className='lg:size-10 text-gray-500'/>
            </button>
          </div>
          
          <form onSubmit="" className='flex rounded shadow items-center px-4 py-2 mt-6  w-[90%] mx-auto'>
            <button className='' type='submit'><IoSearchSharp className='lg:size-6 text-gray-500'/></button>
            <input type="text" placeholder="Search" className='lg:pl-4 lg:text-2xl w-full font-semibold outline-none'/>
          </form>
  
          <div className="flex flex-col mt-6 w-[90%] ">
            <h1 className='text-xl text-gray-600 font-semibold mx-6'>TASKS</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;