import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import toggle from "../../../assets/image/3.png";
import ChangePassword from '../../../AuthUser/Component/ChangePassword/ChangePassword.jsx';

export default function SideBare({adminData}) {
  console.log(adminData)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
<Modal show={show} onHide={handleClose}>
        <Modal.Body>
        <ChangePassword handleClose={handleClose}/>
        </Modal.Body>
      </Modal>

   <div className='sidebarContainer'>
   <Sidebar collapsed={isCollapsed}>
   <div className="logo p-3">
   <Menu>
  <MenuItem onClick={toggleCollapsed} icon={<img src={toggle} />} ></MenuItem>
  </Menu>
   </div>
  <Menu className=''>
  <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}>Home</MenuItem>
 {adminData?.userGroup=="SuperAdmin"?
 <MenuItem icon={<i className=" fa-solid fa-users"></i>} 
 component={<Link to="/dashboard/userlist" />}> User</MenuItem>:""
}
    
{adminData?.userGroup=="SuperAdmin"?
 <MenuItem icon={<i className="fa-solid fa-list"></i>} component={<Link to="/dashboard/category" />}>
  Category</MenuItem>:""
}
{adminData?.userGroup=="SystemUser"?
 <MenuItem icon={<i className="fa-solid fa-heart"></i>} 
 component={<Link to="/dashboard/Favorites" />}> Favorites</MenuItem>:""
}  
    <MenuItem icon={<i className="fa-solid fa-bowl-food"></i>} component={<Link to="/dashboard/Recipes" />}>Recipes</MenuItem>
    <MenuItem onClick={handleShow} icon={<i className="fa-solid fa-unlock"></i>} component={<Link to="/dashboard/Recipes" />}>ChangePassword</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>} onClick={logout}>LogOut</MenuItem>

  </Menu>
</Sidebar>

   </div>
    </>
  )
}
