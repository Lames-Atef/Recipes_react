import React from 'react'
import logo from "../../../assets/image/logo.png.png";
export default function NavBar({adminData}) {
  return (
    <>
<div>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
<form className="form-inline my-2 my-lg-0 w-50">
      <input className="form-control w-100 m-2  " type="search" placeholder="Search" aria-label="Search"/>
    </form>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto me-5 ">     
      <li className="nav-item">
        <a className="nav-link" href="#">{adminData?.userName}</a>
        
      </li>
      <li><img src={logo} alt="" className='w-25 rounded' /></li>
      
    </ul>
    
  </div>
</nav>
</div>
    </>
  )
}
