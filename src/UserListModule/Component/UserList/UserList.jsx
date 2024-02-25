import axios from 'axios'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../../SharedModule/Component/Header/Header.jsx';
import noData from "../../../assets/image/Group no.svg";
import NoData from '../../../SharedModule/Component/NoData/NoData.jsx';


export default function UserList() {
  const [gitList,setGetList]=useState([]);
const gitListUser=async()=>{
  let token=localStorage.getItem("admin");
  try {
    let response=await axios.get('https://upskilling-egypt.com:443/api/v1/Users/?pageSize=10&pageNumber=1'
    ,{headers:{Authorization:token}})
    console.log(response?.data?.data)
    setGetList(response?.data?.data)
  } catch (error) {
    console.log(error.error)
  }
}
useState(()=>{
gitListUser();
},[])

  return (
    <>
     <Header
     tittle={`welcome to users list`}
     description="This is a welcoming screen for the entry of the application , you can now see the options"
     />

     <div>
      {gitList.length>0?
        <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Image</th>
            <th scope="col">phone</th>
            <th scope="col">country</th>
          </tr>
        </thead>
        <tbody>
         {
          gitList.map((user)=>(
            <tr key={user.id}>
            <th scope="row">{user.id}</th>
            <td>{user.userName}</td>
            <td>{user.email}</td>
            <td>{user.imagePath ?<img className='w-25' src={`https://upskilling-egypt.com/${user.imagePath}`}/>:
            (<div className='text-center'><img src={noData} className='w-25'/></div>)}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.country}</td>
          </tr>
          ))}        
        </tbody>
      </table>
      :
      <div>(<NoData/>)</div>
      }   
     </div>
    </>
  )
}
