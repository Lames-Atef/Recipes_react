import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthLayout from './SharedModule/Component/AuthLayout/AuthLayout.jsx'
import Login from './AuthUser/Component/Login/Login.jsx'
import ResetPassword from './AuthUser/Component/ResetPassword/ResetPassword.jsx'
import Home from './HomeModule/Component/Home/Home.jsx'
import MasterLayout from './SharedModule/Component/MasterLayout/MasterLayout.jsx'
import UserList from './UserListModule/Component/UserList/UserList.jsx'
import Recipes from './RcipesModule/Component/Recipes/Recipes.jsx'
import Category from './CategoryModule/Component/Category/Category.jsx'
import { jwtDecode } from 'jwt-decode'
import ProtectedLogin from './SharedModule/Component/ProtectedLogin/ProtectedLogin.jsx'
import ForgetPassword from './AuthUser/Component/ForgetPassword/ForgetPassword.jsx'
import RecipesForm from './RcipesModule/Component/RecipesForm/RecipesForm.jsx'
import UpdateRecipe from './RcipesModule/Component/UpdateRecipe/UpdateRecipe.jsx'
function App() {
const[adminData,setAdminData]=useState(null);

let saveAdminData=()=>{
let encodeData=localStorage.getItem("admin");
let decodedData=jwtDecode(encodeData);
setAdminData(decodedData);
console.log(decodedData);
}
useEffect(()=>{
  if(localStorage.getItem("admin")){
  saveAdminData();}
},[])
var routes=createBrowserRouter([
  {
    path:"/",
   element:
    <AuthLayout/>,
    children:[
      {index:"true",element:<Login saveAdminData={saveAdminData}/>},
      {path:"login",element:<Login saveAdminData={saveAdminData}/>},
      {path:'ResetPassword',element:<ResetPassword/>},
      {path:'ForgetPassword',element:<ForgetPassword/>}

    ]
  },{
    path:"dashboard",
    element:(<ProtectedLogin adminData={adminData}>
<MasterLayout adminData={adminData}/>
    </ProtectedLogin>),
    children:[
      {index:"true",element:<Home  adminData={adminData}/>},
      {path:"userList",element:<UserList/>},
      {path:'category',element:<Category/>},
      {path:'recipes',element:<Recipes/>},
      {path:'recipesForm',element:<RecipesForm/>},
      {path:'updateRecipe/:mealId',element:<UpdateRecipe/>}


  ]}])
  return (
    <>
   <RouterProvider router={routes}/>  

    </>
  )
}

export default App
