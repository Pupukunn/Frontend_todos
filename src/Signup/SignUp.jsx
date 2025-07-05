import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/register', { username, password, email });
      alert('Registration successful');
      navigate('/login'); // นำทางไปหน้า login หลังสมัครสำเร็จ
    } catch (err) {
      alert('Registration failed: ' + err.response.data);
    }
  };

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center bg-[#EAEFEF]'>
        <div className="bg-white w-[80%]  rounded flex-col flex items-center py-10 px-10 max-w-[600px] shadow-xl">
            <h1 className='md:text-6xl text-4xl font-semibold  mx-auto '>
                Sign up
            </h1>
            <form onSubmit={handleSubmit} className='flex flex-col md:gap-7 gap-5 mt-10 w-[70%] '>
            <div>
          
          <input
          className='border-2 border-[#EAEFEF] rounded-xl w-full md:p-4 md:py-3 p-2 md:text-3xl text-2xl md:placeholder:text-2xl  placeholder:text-xl'
          placeholder='Email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
            <div>
          
          <input
          className='border-2 border-[#EAEFEF] rounded-xl w-full md:p-4 md:py-3 p-2 md:text-3xl text-2xl md:placeholder:text-2xl  placeholder:text-xl'
          placeholder='Username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          
          <input
          className='border-2 border-[#EAEFEF] rounded-xl w-full md:p-4 md:py-3  p-2 md:text-3xl text-2xl md:placeholder:text-2xl  placeholder:text-xl'
          placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='cursor-pointer bg-[#7F8CAA] p-4 md:text-2xl text-xl text-white rounded shadow-xl'>Register</button>
        <p className='text-center text-xl'>
          Already have an account? <NavLink to="/login" className='md:text-2xl text-xl font-bold'>Log In</NavLink>
        </p>
      </form>
        </div>
    </div>
  )
}

export default SignUp