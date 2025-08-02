import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { IoHome } from "react-icons/io5";
import { Button, TextField, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, seterrorLogin] = useState(false);
   const [errorLoginData, seterrorLoginData] = useState("2");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);

      navigate("/todos");
    } catch (err) {
      seterrorLogin(true)
    seterrorLoginData(err.response?.data || 'An error occurred');
      setUsername("")
      setPassword("")
      
    }
  };


  return (
    <div className="font-primary max-h-[80%] max-w-screen  flex justify-center items-center bg-linear-to-bl from-[#5085A7] to-[#ABCDD9]">
      <div className="w-full h-screen  flex max-lg:justify-center max-lg:items-center ">
        {/* ฝั่งซ้าย: ภาพพื้นหลัง */}

        <div
          className="xl:basis-6/10 lg:basis-5/10 bg-cover bg-center lg:my-20 lg:ml-20 shadow-xl  "
          style={{ backgroundImage: `url(/src/assets/moring.jpg)` }}
        ></div>
        {/* ฝั่งขวา: ฟอร์ม */}

        <div className="md:w-[70%] w-[85%] flex flex-col justify-center bg-white xl:basis-4/10 lg:basis-5/10 xl:gap-30 lg:gap-25  lg:my-20 lg:mr-20 p-6 rounded   shadow-xl relative  ">
          <NavLink to="/" className="absolute lg:right-5 md:right-10 right-5 md:top-5 top-5  ">
          <IconButton type="button" aria-label="home" sx={{ '& .MuiSvgIcon-root': { fontSize: { xs: '24px', md: '32px' } } }}>
            <HomeOutlinedIcon/>
          </IconButton>
        </NavLink >
          <div className="flex flex-col items-center justify-center  lg:p-0 md:p-15 py-10">
            <h1 className="xl:text-4xl lg:text-3xl md:text-3xl text-2xl font-semibold mt-5 ">
              Login Your Account
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col xl:mt-14 lg:mt-10 md:mt-10 mt-5   lg:w-[70%] w-[100%]  "
            >
              
               <TextField
                  className="w-full"
                   sx={{
                               "& .MuiInputBase-input::placeholder": {
                      fontSize: { xs: "16px", md: "20px" },
                      color: "#757575",
                    },
                    "& .MuiInputBase-input": {
                      fontSize: { xs: "20px", md: "24px" },
                    },
                    '& .MuiInputLabel-root': { fontSize: { xs: "20px",   md: '24px' } ,top : '-6px' },
                    marginBottom : {xl:"64px" , lg:"48px" , md:"40px" , xs:"28px" ,}
                    
                  }}
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  variant="standard"
                  id="standard"
                  placeholder="Enter your Username"
                />
              
              
                <TextField
                  className="w-full  "
                  sx={{
                    "& .MuiInputBase-input::placeholder": {
                      fontSize: { xs: "16px", md: "20px" },
                      color: "#757575",
                    },
                    "& .MuiInputBase-input": {
                      fontSize: { xs: "20px", md: "24px" },
                    },
                    '& .MuiInputLabel-root': { fontSize: { xs: "20px",   md: '24px' } ,top : '-4px' },
                      
                  }}
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="standard"
                  id="standard"
                  placeholder="Enter your password"
                />
              <div className={`lg:my-6 md:my-4 my-4 lg:text-[18px] md:text-[14px] text-[12px] text-red-400 ${errorLogin ? "block" : "opacity-0"}`}>
                {errorLoginData}</div>
              <Button
                type="submit"
                className="cursor-pointer shadow-xl"
                sx={{
                  bgcolor: "#7F8CAA",
                  padding: { xl: "1.5rem", xs: "1rem" },
                  fontSize: { xl: "1.5rem", xs: "1.25rem" },
                  color: "white",
                  borderRadius: "6px",
                  marginBottom : {lg:"40px" , md:"40px" , xs:"28px" ,}
                }}
              >
                Log in
              </Button>
              
              <div className="flex mx-auto items-center gap-2">
              <p className="text-center xl:text-[20px] md:text-[16px] text-[12px]">
                Dont have an account?{" "}
                
              </p>
              <NavLink to="/signup" className="xl:text-2xl md:text-xl text-md font-bold">
                  Sign up
                </NavLink>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
