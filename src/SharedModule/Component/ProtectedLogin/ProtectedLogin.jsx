import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedLogin({adminData,children}) {
 if(adminData==null && localStorage.getItem("admin")==null){
    return<Navigate to="/login"/>
 }else{
    return children;
 }
}
