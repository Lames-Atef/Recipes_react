import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../../assets/image/logo.png.png";

export default function Login({saveAdminData}) {
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
    toast.success("loginnnnn",{autoClose: 5000}),1000
   }) 
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message,{autoClose: 5000})
      console.log(error?.response?.data?.message);
    }
  }
  return (
    <>
    <div className="container-flied share_bg vh-100">
<div className="row vh-100 justify-content-center align-items-center overlay ">
  <div className="col-md-5">
  <ToastContainer />

    <div className=' bg-white rounded-3'>
    <div className='logo m-3 text-center'>
      <img src={logo} className='w-50' alt='logo food'/>
    </div>
   <div className="w-75 m-auto">
   <div className='p-3'>
<h4> LogIn</h4>
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
<div className='d-flex justify-content-between mb-3'>
<Link to="/ResetPassword" >ResetPassword?</Link>

<Link to="/ForgetPassword" className='text-success'>ForgetPassword?</Link>
</div>



<button className='btn btn-success w-100 mb-3'>LogIn</button>

    </form>
   </div>
    </div>

  </div>
</div>
    </div>
    </>
  )
}
