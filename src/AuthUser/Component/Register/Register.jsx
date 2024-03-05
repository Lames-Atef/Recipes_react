import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../../assets/image/logo.png.png";

export default function Register() {
  
  const navigate=useNavigate();
  const {register,handleSubmit,formState:{errors}}=useForm();

  const appendRegisterData=(data)=>{
    let formData=new FormData();
    formData.append("userName",data.userName),
    formData.append("email",data.email),
    formData.append("phoneNumber",data.phoneNumber),
    formData.append("country",data.country),
    formData.append("password",data.password),
    formData.append("confirmPassword",data.confirmPassword),
    formData.append("profileImage",data.profileImage[0])
return formData;
  }
const submitData=async (data)=>{
    let appendData=appendRegisterData(data);
    try {
      let response=await axios.post("https://upskilling-egypt.com:443/api/v1/Users/Register"
      ,appendData);
      console.log(response?.data);
      navigate('/VerifyAccount')
  
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
<div className="container-flied share_bg vh-100">
<div className="row vh-100 justify-content-center align-items-center overlay ">
  <div className="col-md-7">
  <ToastContainer />

    <div className=' bg-white rounded-3'>
    <div className='logo m-3 text-center pt-4'>
      <img src={logo} className='w-50' alt='logo food'/>
    </div>
   <div className="w-75 m-auto">
   <div className='p-3'>
<h2 style={{color:"#198754"}}>Register</h2>
<p className='text-muted'>Welcome Back! Please enter your details</p>
    </div>
    <form onSubmit={handleSubmit(submitData)}>
      <div className='row '>
<div className="col-md-6">
    <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-user"></i></span>
  <input type="text" {...register("userName",{required:true,
  pattern:{
    message:"userName not valid"
  }})} className="form-control" placeholder="Enter your userName"/>
  {errors.userName&&(<p className='p-1 m-0 alert alert-danger'>{errors.userName.message}</p>)}
</div>
</div>
<div className="col-md-6">
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input type="password" {...register("password",{required:true
    })} className="form-control" placeholder="Enter your Password"/>
  {errors.password&&<p>{errors.password.message}</p>}
</div>
</div>
</div>
<div className='row '>
<div className="col-md-6">

    <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-envelope"  aria-hidden="true"></i></span>
  <input type="text" {...register("email",{required:true,
  pattern:{
    value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message:"E-mail not valid"
  }})} className="form-control" placeholder="Enter your Email"/>
  {errors.email&&<p className='alert alert-danger'>{errors.email.message}</p>}
</div>
</div>
<div className="col-md-6">
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input type="password" {...register("confirmPassword",{required:true})} className="form-control" placeholder="Enter your confirmPassword"/>
  {errors.confirmPassword&&<p>{errors.confirmPassword.message}</p>}
</div>
</div>
</div>
<div className='row '>
<div className="col-md-6">

    <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-earth-americas"></i></span>
  <input type="text" {...register("country",{required:true,
  pattern:{
    message:"E-mail not valid"
  }})} className="form-control" placeholder="Enter your country"/>
  {errors.country&&<p className='alert alert-danger'>{errors.country.message}</p>}
</div>
</div>
<div className="col-md-6">
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-phone"></i></span>
  <input type="number" {...register("phoneNumber",{required:true,
      pattern:{
        message:"phoneNumber is required"
  }})} className="form-control" placeholder="Enter your phoneNumber"/>
  {errors.phoneNumber&&<p>{errors.phoneNumber.message}</p>}
</div>
</div>
</div>
   <div className='row'>
   <div className="col-md-12">
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-phone"></i></span>
  <input type="file" {...register("profileImage",{required:true,
      pattern:{
        message:"profileImage is required"
  }})} className="form-control" placeholder="Enter your profileImage"/>
  {errors.profileImage&&<p>{errors.profileImage.message}</p>}
</div>
</div>
    </div>  

<button className='btn btn-success w-100 mb-3'>Register</button>

    </form>
   </div>
    </div>

  </div>
</div>
    </div>
    </>
  )
}
