import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../../assets/image/logo.png.png";

export default function Login({saveAdminData}) {
  const[type,setType]=useState("password");
  const[icone,setIcone]=useState(false);

  const handelToggle=()=>{
    if(type=="password"){
      setIcone(true);
      setType("text");
    }else{
      setIcone(false);
      setType("password");  
    }
  }

  const navigate=useNavigate();
  const {register,handleSubmit,formState:{errors}}=useForm();
  async function submitData (data){
    try {
      let response=await axios
    .post("https://upskilling-egypt.com:443/api/v1/Users/Login",data);
     
      console.log(response.data.token);
    localStorage.setItem("admin",response.data.token);
    saveAdminData();
   setTimeout(()=>{
    toast.success("login done",{autoClose: 5000}),1000
   }) 
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message,{autoClose: 5000})
      console.log(error?.response?.data?.message);
    }
  }
  return (
    <>
    <ToastContainer /> 
    <div className="  share_bg vh-100 ">

<div className="overlay pt-5">
 <div className="d-flex  justify-content-center align-items-center">
<div className="w-50">
  

    <div className=' bg-white rounded-3'>
    <div className='logo m-3 text-center pt-3'>
      <img src={logo} className='w-50' alt='logo food'/>
    </div>
   <div className="w-75 m-auto">
   <div className='p-3'>
<h2 style={{color:"#198754"}}> LogIn</h2>
<p className='text-muted'>Welcome Back! Please enter your details</p>
    </div>
    <form onSubmit={handleSubmit(submitData)}>
    <div className="input-group mb-3">
    
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-envelope "  aria-hidden="true"></i></span>
  <input  type="text" {...register("email",{required:true,
  pattern:{
    value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message:"E-mail not valid"
  }})} className="form-control" placeholder="Enter your Email"/>
  {errors.email&&<p className='alert alert-danger'>{errors.email.message}</p>}
</div>

                        <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input type="password" {...register("password",{required:true,
  pattern:{
    value:{...register("password",{required:true,
      pattern:{
        value:/^[a-zA-Z0-9]{3,30}$/,
        message:"password is required"
      }})},
    message:"password is required"
  }})} className="form-control" placeholder="Enter your Password"/>
  {errors.password&&<p>{errors.password.message}</p>}
  <span className="input-group-text" id="basic-addon1" onClick={handelToggle} >
                                {icone ? (
                                   <i className="fa-solid fa-eye"></i>
                                ) : (
                                  <i className="fa-solid fa-eye-slash"></i>
                                )}
                            </span> 
</div>

<div className='d-flex justify-content-between mb-3'>
<Link  style={{textDecoration: 'none',color:"black"}} to="/register" >Register Now?</Link>

<Link  style={{textDecoration: 'none'}} to="/ForgetPassword" className='text-success'>ForgetPassword?</Link>
</div>
<button className='btn btn-success w-100 mb-3'>LogIn</button>

    </form>
   </div>
    </div>

  </div> 
 </div>
</div>
    </div>
    </>
  )
}
