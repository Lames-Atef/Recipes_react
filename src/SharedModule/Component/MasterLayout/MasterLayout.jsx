import React from 'react'
import NavBar from '../NavBar/NavBar.jsx'
import { Outlet } from 'react-router-dom'
import SideBare from '../SideBare/SideBare.jsx'

export default function MasterLayout({adminData}) {
  return (
    <>
    <div className='d-flex'>

    <div className="">
       <SideBare adminData={adminData}/>
       </div>
    <div className="w-100">
       <NavBar adminData={adminData}/>
     
        <Outlet/>
    </div>
</div>
    
    </>
  )
}
