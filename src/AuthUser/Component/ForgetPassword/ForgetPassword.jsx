import React from 'react'
import logo from "../../../assets/image/logo.png.png"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form"
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
export default function ForgetPassword() {
    const navigate=useNavigate();
  const {register,handleSubmit,formState:{errors}}=useForm();
  async function submitData (data){
    try {
      let response=await axios
    .post('https://upskilling-egypt.com:443/api/v1/Users/Reset/Request',data);
    setTimeout(()=>{
      toast.success("done",{autoClose: 5000}),1000
     }) 
      navigate("/ResetPassword");
    } catch (error) {
      toast.error(error?.response?.data?.message,{autoClose: 5000})
      console.log(error?.response?.data?.message);
    }
  }
  return (
    <>
    <ToastContainer/>
    <div className="container-flied share_bg vh-100">
<div className="row vh-100 justify-content-center align-items-center overlay ">
  <div className="col-md-5">
    <div className=' bg-white rounded-3'>
    <div className='logo m-3 text-center pt-4'>
      <img src={logo} className='w-50' alt='logo food'/>
    </div>
   <div className="w-75 m-auto">
   <div className='p-3'>
<h4>Forget your Password?</h4>
<p className='text-muted'>No worries! Please enter your email and we will send a password reset link </p>
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

<button className='btn btn-success w-100 mb-3'>Submit</button>

    </form>
   </div>
    </div>

  </div>
</div>
    </div>
    </>
  )
}
