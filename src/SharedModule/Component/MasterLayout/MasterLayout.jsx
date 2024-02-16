import React from 'react'
import NavBar from '../NavBar/NavBar.jsx'
import { Outlet } from 'react-router-dom'
import SideBare from '../SideBare/SideBare.jsx'
import Home from '../../../HomeModule/Component/Home/Home.jsx'
import Header from '../Header/Header.jsx'
export default function MasterLayout({adminData}) {
  return (
    <>
    <div className='d-flex'>

    <div className="">
       <SideBare/>
       </div>
    <div className="w-100">
       <NavBar adminData={adminData}/>
       <Header adminData={adminData}/>
        <Outlet/>
    </div>
</div>
    
    </>
  )
}
