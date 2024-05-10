import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
function Navbar() {
  const naviagte=useNavigate()
 const [user, setuser] = useState("riva")


const logout = () =>  {
console.log("logout")
setuser(" ")
console.log(user);
localStorage.clear()
naviagte('/')
}

  return (
    <div>

      <div className=' p-2 border-black border-2 flex  bg-gray-400' >
     <div className=' flex-auto w-32 '>

          <Link to="/home"  className='  ml-32 m-6' >home</Link>
          <Link to="/createemp" className='m-6'>Create Employee</Link>
          <Link to="/listemp" className='m-6'>List Employee</Link>
     </div>
     <div className=' flex-auto w-32'>

       <span className='m-6 ml-64'>
       {user}
        </span>  
          <span to="/" className='ml-7'  onClick={logout} >Logout</span>
     </div>

     
      </div>
    </div>
  )
}

export default Navbar