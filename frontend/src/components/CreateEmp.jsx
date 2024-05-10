import React, { useEffect } from "react";
import Yellow from "./Yellow";
import { useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import { useNavigate,useLocation } from "react-router-dom";

function CreateEmp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setdesignation] = useState("designation");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [emptyError, setEmptyError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const [username, setUsername] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate()
 
  const location = useLocation();
  useEffect(()=>{

    if(location.state)
    {
        let data=location.state
        console.log(data)

        setName(data.name);
        setEmail(data.email);
        setdesignation(data.designation);
        setSelectedGender(data.gender)
        setPhoneNumber(data.mobile)
        setSelectedCourses(data.course.split(","))
        setSelectedImage(data.image)
        setIsEdit(true)
    }
  },[location])

  const handleCourseChange = (event) => {
    const { value } = event.target;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCourses([...selectedCourses, value]);
    } else {
      setSelectedCourses(selectedCourses.filter((course) => course !== value));
    }
  };



  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };
  const validate = () => {
    if (
      name === "" ||
      email === "" ||
      designation === "" ||
      phoneNumber === ""
    ) {
      setEmptyError("All fields are mandatory");
      setUsername("");
      return false;
    }
    if (!name.match(/^[A-Za-z0-9- ]+$/)) {
      setNameError("Name is not alphanumeric");
      setUsername("");
      return false;
    }

    if (!email.includes("@")) {
      setEmailError("must contain @");
      setUsername("");
      return false;
    }

    if (!phoneNumber.toString().match(/^[0-9]+$/)) {
      setPhoneNumberError("Phone Number Must contain only numbers");
      setUsername("");
      return false;
    }

    return true;
  };
  const resetErrorDefault = () => {
    setNameError("");
    setEmptyError("");
    setEmailError("");
    setPhoneNumberError("");
  };

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    resetErrorDefault();
    const isValid = validate();
    if (isValid) {
      let data={name,email,designation,mobile:phoneNumber,course:selectedCourses.join(","),gender:selectedGender,image:selectedImage}

      console.log(data)
      try {
        let authtoken=  localStorage.getItem('authtoken')
    
        const headers = {
          'Content-Type': 'application/json',
          'auth-token': authtoken
        };
        let api;
        if(isEdit) 
        {
          api='http://localhost:8000/api/employee/edit'
          data._id=location.state._id;
        }
        else
        {
          api='http://localhost:8000/api/employee/addemployee'
        }
        await axios.post(
          api, 
          {...data},
          { headers } 
        );
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
    }
  };
  const uploadHandler = async (e) => {
    e.preventDefault()
    let imgs = e.target.files[0]
    if (!imgs) return alert("File not exist.")
    let data = new FormData()
    data.append('file', imgs)
    data.append('upload_preset', "zpn6u7rm")
    data.append('cloud_name', "somug")
    fetch(' https://api.cloudinary.com/v1_1/somug/image/upload', {
        method: "post",
        body: data
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.url)
            setSelectedImage(data.url)
            // setPicUploadMessage("PICTURE UPLOADED")
        })
        .catch(err => {
            console.log(err)
        })
}


  return (
    <div>
      <Navbar />
      <Yellow name="Create Employee" />
      <div>
        <form onSubmit={handleSubmit} className=" p-5 m-3">
          <fieldset className=" flex-row m-3 ">
            <span className=" m-7">Name</span>
              <input
            className="border-2 border-black m-2 "
       
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            {nameError}
            <br />
            <span className=" m-7">Email</span>
              <input
            className="border-2 border-black m-2 "
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <span className=" m-5"> Number</span>
              <input
            className="border-2 border-black m-2 "
         
              type="number"
              value={phoneNumber}
              placeholder="Phone Number"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />

            {emailError}
            <br />
            <span className=" m-5">designation</span>
            <select
            className="border-2 border-black"
              name="designation"
              value={designation}
              onChange={(e) => {
                setdesignation(e.target.value);
              }}
            >
              <br />

              <option value="designation" selected>
                designation
              </option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
            <br />
            <div>
              <label>
              <span className=" m-5">Course</span>


                  <input
            className="border-2 border-black m-2 "
                  type="checkbox"
                  value="MCA"
                  checked={selectedCourses.includes("MCA")}
                  onChange={handleCourseChange}
                />
                MCA
              </label>
              <label>
                  <input
            className="border-2 border-black m-2 "
                  type="checkbox"
                  value="BCA"
                  checked={selectedCourses.includes("BCA")}
                  onChange={handleCourseChange}
                />
                BCA
              </label>
              <label>
                  <input
            className="border-2 border-black m-2 "
                  type="checkbox"
                  value="BSC"
                  checked={selectedCourses.includes("BSC")}
                  onChange={handleCourseChange}
                />
                BSC
              </label>
              <br/>
              <span className=" m-5"> Gender</span>
              <label>
                  <input
            className="border-2 border-black m-2 "
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={selectedGender === "Male"}
                  onChange={handleGenderChange}
                />
                Male
              </label>
              <label>
                  <input
            className="border-2 border-black m-2 "
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={selectedGender === "Female"}
                  onChange={handleGenderChange}
                />
                Female
              </label>
            </div>
              <input
            className="border-2 border-black m-2 " type="file"  onChange={uploadHandler} accept="image/*"/>
<br/>

          {   !isEdit &&  <input
            className="border-2 border-black m-2 " type="submit" value="Submit" />}
          {   isEdit &&  <input
            className="border-2 border-black m-2 " type="submit" value="Edit" />}
          </fieldset>
        </form>
      </div>
      <div>
        <h2>
          {emptyError}
          {nameError}
          {phoneNumberError}
        </h2>
      
      </div>
      <div >

   
      </div>
    </div>
  );
}

export default CreateEmp;
