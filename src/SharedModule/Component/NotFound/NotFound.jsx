import React from 'react'

import ropot from "../../../assets/image/ropot.svg.jpg"
import logo from "../../../assets/image/logo.png.png"
import { useNavigate } from 'react-router-dom';
export default function NotFound() {
  const navigate=useNavigate();
  return (
    <>
    <div className='layer-Not  vh-100 ' >
    <div className="item  p-3">
<div className='logo m-3  pt-4'>
      <img src={logo} className='w-25' alt='logo food'/>
    </div>
      <h2>OoPs</h2>
      <h4 style={{color:"green"}}>Page  not found </h4>
      <p>This Page doesn’t exist or was removed!
We suggest you  back to home.</p>
      <button className=' btn btn-success w-25' onClick={()=>navigate("/dashboard/")}><i className="mx-2 fa-solid fa-arrow-left"></i>Back To <br/>Home</button>
    </div>
    </div>
    </>
  )
}
