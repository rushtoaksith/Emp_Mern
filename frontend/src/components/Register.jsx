import React from 'react'
import Yellow from './Yellow'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [signIndata,setSignInData]=useState({
    name:'',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prevData) => ({
      ...prevData, 
      [name]: value, 
    }));
  };



  const handleSubmit = (event) => {
    event.preventDefault();

    if (signIndata.password === signIndata.confirmPassword) {
     signUp()
    } else {
      alert('Passwords do not match');
    }
  };
  useEffect(() => {
    let authtoken=localStorage.getItem('authtoken');
    if(authtoken)
    {
      navigate("/home")
    }
  })
  const signUp = async () => {
    try {
      const {confirmPassword,...data} =signIndata
  
      const headers = {
        'Content-Type': 'application/json',
      };
      const response = await axios.post(
        'http://localhost:8000/api/user/signup', 
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
      <Yellow name="Register"/>
      <div className="flex justify-center items-center h-[70vh]">
      <form onSubmit={handleSubmit} className="flex flex-col m-5 border-yellow-400 border p-5">
        <div className="m-3">
          <label className="m-4">Username:</label>
          <input
            className="border-2 border-black"
            type="text"
            id="username"
            value={signIndata.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="m-3">
          <label className="m-4">Email:</label>
          <input
            className="border-2 border-black"
            type="email"
            id="email"
            value={signIndata.email}
            onChange={handleChange}
            name='email'
          />
        </div>
        <div className="m-3">
          <label className="m-4">Password:</label>
          <input
            className="border-2 border-black"
            type="password"
            id="password"
            value={signIndata.password}
            onChange={handleChange}
            name='password'
          />
        </div>
        <div className="m-3">
          <label className="m-4">Confirm Password:</label>
          <input
            className="border-2 border-black"
            type="password"
            id="confirmPassword"
            value={signIndata.confirmPassword}
            onChange={handleChange}
            name='confirmPassword'
          />
        </div>
        <button className="border w-20 border-blue-500 m-5 ml-32" type="submit">
          Signup
        </button>
        <div className="flex justify-center">
          <span className="text-sm">Already have an account?</span>
          <Link to="/" className="text-blue-400 text-sm">
            Login
          </Link>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Register