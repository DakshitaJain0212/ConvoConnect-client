import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Label,
  Input 
  } from 'reactstrap';
import signinImage from "../assets/signup.jpg";
import icon from '../assets/icon.jpeg';
import { message } from 'antd';

const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);
  const [imageUrl , setImageUrl] = useState(icon);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { username, password, phoneNumber, avatarURL } = form;
      const URL = "https://convo-connect-server.vercel.app";
  
      const data = await axios.post(
        `${URL}/${isSignup ? "signup" : "login"}`,
        {
          username,
          password,
          fullName: form.fullName,
          phoneNumber,
          avatarURL,
        }
      );
  
      if (data.status === 200) { 
        const {
          data: { token, userId, hashedPassword, fullName },
        } = data;
  
        cookies.set("token", token);
        cookies.set("username", username);
        cookies.set("fullName", fullName);
        cookies.set("userId", userId);
  
        if (isSignup) {
          cookies.set("phoneNumber", phoneNumber);
          cookies.set("avatarURL", avatarURL);
          cookies.set("hashedPassword", hashedPassword);
        }
  
        message.success("Login successful!");
        window.location.reload();
        // Redirect or do any other action upon successful login
      } else if (data.status === 500) { // Check if the response status is 401 (Unauthorized)
        message.error(data.response.data.message);
      } else {
        // Handle other response statuses if needed
        message.error("Failed to log in. Please try again later.");
      }
    } catch (error) {
       // eslint-disable-next-line no-console
      console.error("Error:", error);
      message.error(error.response.data.message);
    }
  };
  

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };


  const handleImage = (event) => {
    console.log("hello");
    event.preventDefault();
   
      const selectedFile = event.target.files[0];
      const data = new FormData();
      data.append('file',selectedFile);
      data.append('upload_preset','convoConnect');
      data.append('cloud_name',"dk2hwqtnv");
      fetch(`https://api.cloudinary.com/v1_1/dk2hwqtnv/image/upload`,{
        method: 'POST',
        body: data
      })
      .then((res) => res.json())
      .then((data)=>{
        console.log(data.secure_url);
        const file_loc = data.secure_url;
        setForm({ ...form, ["avatarURL"]: file_loc});
        setImageUrl(file_loc);
        console.log(imageUrl);
        console.log(form);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_form">
        <div className="auth__form-container_image">
          <img src={signinImage} alt="sign in" />
        </div>
        <div className="auth__form-container_fields">
          <div className="auth__form-container_fields-content">
            <p className="auth_form-container_heading">{isSignup ? "Welcome to ConvoConnect!" : "Welcome Back!"}</p>
            <form onSubmit={handleSubmit}>
              {isSignup && (
                <div className="auth__form-container_fields-content_input">
                  
                    
                    {/* <label htmlFor="fullName">Full Name</label> */}
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    onChange={handleChange}
                    required
                    />
                </div>
              )}
              <div className="auth__form-container_fields-content_input">
                {/* <label htmlFor="username">Username</label> */}
                <input
                  name="username"
                  type="text"
                  placeholder="Enter the Username"
                  onChange={handleChange}
                  required
                />
              </div>
              {isSignup && (
                <div className="auth__form-container_fields-content_input">
                  {/* <label htmlFor="phoneNumber">Phone Number</label> */}
                  <input
                    name="phoneNumber"
                    type="text"
                    placeholder="Enter your phone number"
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              
              <div className="auth__form-container_fields-content_input">
                {/* <label htmlFor="password">Password</label> */}
                <input
                  name="password"
                  type="password"
                  placeholder="Enter a new password"
                  onChange={handleChange}
                  required
                />
              </div>
              {isSignup && (
                <div style={{display: "flex",
                  flexDirection: "row",
                  position: "relative",
                  justifyContent: "flex-start",
                  gap: "0.75rem",
                }}>
                <span className="auth__form-container_fields-content_file_image">
                  <div className="auth__form-container_fields-content_file_figure">
                    <img 
                    src={imageUrl} 
                     alt="image" 
                    style={{
                      width: "100%",
                      borderRadius: "50%",
                  }}
                  />
                  </div>
                </span>
                <div className="auth__form-container_fields-content_file">
                
                  <label htmlFor="avatarURL" >Upload Photo</label>
                  <input
                  name="avatarURL" 
                  type="file" 
                  id="imageInput" 
                  placeholder="Upload an image file"
                  onChange={handleImage} 
                  accept="image/*"
                  // style={{ display: 'none'}}
                  >
                  </input>
                  
                  
                </div>
                </div>
              )}
              <div className="auth__form-container_fields-content_button">
                <button className="auth__form-container_fields-content_button">{isSignup ? "Sign Up" : "Sign In"}</button>
              </div>
            
            </form>

            <div className="auth__form-container_fields-account">
              <p>
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <span onClick={switchMode}>
                  {isSignup ? "Sign In" : "Sign Up"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
