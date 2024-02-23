import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../../assets/image/logo.png.png";

export default function ChangePassword({handleClose}) {
  const {register,handleSubmit,formState:{errors}}=useForm();

    async function submitData (data){
        let token=localStorage.getItem("admin")
        try {
          let response=await axios
        .put('https://upskilling-egypt.com:443/api/v1/Users/ChangePassword',data ,
        {headers:{Authorization:token}});
       console.log(response.data)
        handleClose();
        } catch (error) {
          console.log(error?.response?.data?.message);
        }
      }
  return (
    <>
    <div className=' bg-white rounded-3'>
    <div className='logo m-3 text-center'>
      <img src={logo} className='w-50' alt='logo food'/>
    </div>
   <div className="w-75 m-auto">
   <div className='p-3'>
<h4>change Password</h4>
<p className='text-muted'>Welcome Back! Please enter your details</p>
    </div>
    <form onSubmit={handleSubmit(submitData)}>
    <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input type="password" {...register("oldPassword",{required:true,
  
})} className="form-control" placeholder="Enter your oldPassword"/>
  {errors.oldPassword&&<p>{errors.oldPassword.message}</p>}
</div>
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input type="password" {...register("newPassword",{required:true,
  })} className="form-control" placeholder="Enter your newPassword"/>
  {errors.newPassword&&<p>{errors.newPassword.message}</p>}
</div>
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input type="password" {...register("confirmNewPassword",{required:true,
 })} className="form-control" placeholder="Confirm new Password"/>
  {errors.confirmNewPassword&&<p>{errors.confirmNewPassword.message}</p>}
</div>
<button className='btn btn-success w-100 mb-3'>Change Password</button>
    </form>
   </div>
    </div>
    </>
  )
}
