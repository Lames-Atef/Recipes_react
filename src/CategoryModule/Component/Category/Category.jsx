import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../../SharedModule/Component/Header/Header.jsx';


export default function Category() {
  return (
    <>
    <Header 
    tittle={"welcome category"}
    description={"This is a welcoming screen for the entry of the application , you can now see the options"}
    />
    </>
  )
}
