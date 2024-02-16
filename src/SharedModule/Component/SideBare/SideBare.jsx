import React, { useState } from 'react'
import { useNavigate ,Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar.jsx';
import toggle from "../../../assets/image/3.png"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
export default function SideBare() {
  const [isCollapsed,setIsCollapsed]=useState(false);
const toggleCollapsed=()=>{
setIsCollapsed(!isCollapsed);
}

  let navigate=useNavigate();
  let logout=()=>{
    localStorage.removeItem("admin");
    navigate("/login");
  }
  
  return (
    <>
   <div className='sidebarContainer'>
   <Sidebar collapsed={isCollapsed}>
    <Menu>
  <MenuItem onClick={toggleCollapsed} icon={<img src={toggle} />} ></MenuItem>
   

  </Menu>
  <Menu>
  <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}>Home</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-users"></i>} component={<Link to="/dashboard/userlist" />}> User</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-list"></i>} component={<Link to="/dashboard/category" />}>Category</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-list"></i>} component={<Link to="/dashboard/Recipes" />}>Recipes</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>} onClick={logout}>LogOut</MenuItem>

  </Menu>
</Sidebar>

   </div>
    </>
  )
}
