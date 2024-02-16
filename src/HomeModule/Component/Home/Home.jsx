import React from 'react'
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../../SharedModule/Component/Header/Header.jsx';
export default function Home({adminData}) {
  return (
    <>
      <ToastContainer />

     <Header
     tittle={`welcome to ${adminData?.userName}`}
     description="This is a welcoming screen for the entry of the application , you can now see the options"
     />
      </>
  )
}