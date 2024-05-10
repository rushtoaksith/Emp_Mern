import React from 'react'
import Yellow from './Yellow'
import { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [loginData,setToginData]=useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setToginData((prevData) => ({
      ...prevData, 
      [name]: value, 
    }));
  };
  useEffect(() => {
    let authtoken=localStorage.getItem('authtoken');
    if(authtoken)
    {
      navigate("/home")
    }
  })


  const handleSubmit = (event) => {
    event.preventDefault();
    login()
  };
  const login = async () => {
    try {
      const data =loginData
  
      const headers = {
        'Content-Type': 'application/json',
      };
      const response = await axios.post(
        'http://localhost:8000/api/user/login', 
        data, 
        { headers } 
      );
  
      console.log('Response:', response.data); 
      localStorage.setItem('authtoken',response.data.authtoken)
      navigate("/home")
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data); 
      } else if (error.request) {
        console.error('No response:', error.request); 
      } else {
        console.error('Axios error:', error.message); 
      }
    }
  };



  return (
    <div>
      <Yellow name="Login" />
      <div className=' flex justify-center items-center h-[70vh]'>


      <form onSubmit={handleSubmit} className=' flex flex-col m-5 border-yellow-400 border p-5'>
      <div className='m-3' >
        <label className='m-4 ' >Username:</label>
        <input
                className='border-2 border-black'

          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
        />
      </div>
      <div className=' m-3'>
        <label  className='m-4 '>Password:</label>
        <input
        className='border-2 border-black'
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />
      </div>
      <button className='border w-20 border-blue-500 m-5 ml-32'  type="submit">Login</button>
      <div className='flex justify-center'>
   <span className='text-sm'>Don't have Account?</span>  <Link to="/register" className='text-blue-400 text-sm' >Register </Link>
      </div>
    </form>
      </div>
    </div>
  )
}

export default Login