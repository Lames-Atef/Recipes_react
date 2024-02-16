import React from 'react'
import logo from "../../../assets/image/logo.png.png"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form"
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const navigate=useNavigate();
  const {register,handleSubmit,formState:{errors}}=useForm();
  async function submitData (data){
    try {
      let response=await axios
    .post('https://upskilling-egypt.com:443/api/v1/Users/Reset',data);
      navigate("/login");
    } catch (error) {
      
      console.log(error?.response?.data?.message);
    }
  }
  return (
      <>
    
    <div className="container-flied share_bg vh-100">
<div className="row vh-100 justify-content-center align-items-center overlay ">
  <div className="col-md-5">
  

    <div className=' bg-white rounded-3'>
    <div className='logo m-3 text-center'>
      <img src={logo} className='w-50' alt='logo food'/>
    </div>
   <div className="w-75 m-auto">
   <div className='p-3'>
<h4> Reset Password</h4>
<p className='text-muted'>Welcome Back! Please enter your details</p>
    </div>
    <form onSubmit={handleSubmit(submitData)}>
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
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input type="text" {...register("seed",{required:true,
  pattern:{
    value:{...register("seed",{required:true,
      pattern:{
        message:"otp is required"
      }})},
    message:"otp is required"
  }})} className="form-control" placeholder="Enter otp"/>
  {errors.seed&&<p>{errors.seed.message}</p>}
</div>
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input type="text" {...register("password",{required:true,
  pattern:{
    value:{...register("email",{required:true,
      pattern:{
        value:/^[a-zA-Z0-9]{3,30}$/,
        message:"password is required"
      }})},
    message:"password is required"
  }})} className="form-control" placeholder="Enter your Password"/>
  {errors.password&&<p>{errors.password.message}</p>}
</div>
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input type="password" {...register("confirmPassword",{required:true,
  pattern:{
    value:{...register("confirmPassword",{required:true,
      pattern:{
        value:/^[a-zA-Z0-9]{3,30}$/,
        message:"confirm new password is required"
      }})},
    message:"Confirm new password is required"
  }})} className="form-control" placeholder="Confirm new Password"/>
  {errors.confirmPassword&&<p>{errors.confirmPassword.message}</p>}
</div>

<button className='btn btn-success w-100 mb-3'>Reset Password</button>

    </form>
   </div>
    </div>

  </div>
</div>
    </div>
    </>
  )
}
