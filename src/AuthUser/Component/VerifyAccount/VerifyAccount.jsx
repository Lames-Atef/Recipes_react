import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/image/logo.png.png";
import axios from 'axios';
export default function VerifyAccount() {
    const navigate=useNavigate();
    const {register,handleSubmit,formState:{errors}}=useForm();
    async function submitData (data){
      try {
        let response=await axios
      .put('https://upskilling-egypt.com:443/api/v1/Users/verify',data);
        navigate("/dashboard");
      } catch (error) {
        
        console.log(error);
      }
    }
  return (
    <>
     <div className="container-flied share_bg vh-100">
<div className="row vh-100 justify-content-center align-items-center overlay ">
  <div className="col-md-5">
    <div className=' bg-white rounded-3'>
    <div className='logo m-3 text-center pt-4'>
      <img src={logo} className='w-50' alt='logo food'/>
    </div>
   <div className="w-75 m-auto">
   <div className='p-3'>
<h2 style={{color:"#198754"}}>Verify Account</h2>
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
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input type="text" {...register("code",{required:true,
  pattern:{
    value:{...register("code",{required:true,
      pattern:{
        message:"code is required"
      }})},
    message:"code is required"
  }})} className="form-control" placeholder="Enter code"/>
  {errors.code&&<p>{errors.code.message}</p>}
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
