import React from 'react'

export default function NavBar({adminData}) {
  return (
    <>
<div>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
<form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search"/>
      
    </form>


  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto me-5">     
      <li className="nav-item">
        <a className="nav-link" href="#">{adminData?.userName}</a>
      </li>
      
    </ul>
    
  </div>
</nav>
</div>
    </>
  )
}
