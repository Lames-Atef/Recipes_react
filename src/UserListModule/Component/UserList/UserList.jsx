import axios from 'axios'
import Delete from '../../../SharedModule/Component/Delete/Delete.jsx';
import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../../SharedModule/Component/Header/Header.jsx';
import noData from "../../../assets/image/Group no.svg";
import Modal from 'react-bootstrap/Modal';
import NoData from '../../../SharedModule/Component/NoData/NoData.jsx';
import Loading from '../../../SharedModule/Component/Loading/Loading.jsx';
import { useForm } from 'react-hook-form';

export default function UserList() {
  const [gitList,setGetList]=useState([]);
  const [show, setShow] = useState(false);
  const[gitName,setGitName]=useState("");
  const[gitEmail,setGitEmail]=useState("");
  const[pageArray,setPageArray]=useState([]);  
  const [userId,setUserId]=useState(0);
  const [isloading, setisLoading] = useState(false)
  const [modalState, setModalState] = useState(false);
  const [viewCard, setViewCard] = useState([]);

  const {register,handleSubmit,setValue,formState:{errors}}=useForm();
  const handleClose = () => setModalState(false);

const gitListUser=async(pageNumber,pageSize,name,email)=>{
  let token=localStorage.getItem("admin");
  try {
    setisLoading(true);
    let response=await axios.get('https://upskilling-egypt.com:443/api/v1/Users/'
    ,{headers:{Authorization:token},
  params:{pageSize:pageSize,
    pageNumber:pageNumber,
    userName:name,
    email:email}
  })
  setPageArray(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1)
)
    console.log(response?.data?.data)
    setGetList(response?.data?.data)
    setisLoading(false);
  } catch (error) {
    console.log(error.error)
  }
}
const handleDelete=(id)=>{
  setUserId(id);
setShow(true);
setModalState("delete");
}
const deleteUser=async()=>{
  let token=localStorage.getItem("admin");
  try {
    let response=await axios.delete
    (`https://upskilling-egypt.com:443/api/v1/Users/${userId}`,
    {headers:{Authorization:token}});
  gitListUser();
    handleClose();
   } catch (error) {
    console.log(error)
   }
}

useState(()=>{
gitListUser(1,5);
},[])
const getNameValue=(data)=>{
  setGitName(data.target.value);
  gitListUser(1,5,data.target.value,gitEmail);
}
const getEmailValue=(data)=>{
  setGitEmail(data.target.value);
  gitListUser(1,5,data.target.value,gitName);
}



  return (
    <>
     <Header
     tittle={`welcome to users list`}
     description="This is a welcoming screen for the entry of the application , you can now see the options"
     />


     <Modal show={modalState=="delete"} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(deleteUser)}>
         <Delete/>
<button className='btn btn-outline-danger' onClick={deleteUser} >Delete item</button>
          </form>
        </Modal.Body>
      </Modal>
      {isloading?<Loading/>: (<> <div className='selects-recipe row p-3'>
<div className='col-md-6'>
  <div>
    <input type='text' className='form-control mb-3' onChange={getNameValue} placeholder='Select By Name'/>
  </div>
</div>
<div className='col-md-6'>
  <div>
    <input type='email' className='form-control mb-3' onChange={getEmailValue} placeholder='Select By email'/>
  </div>
</div>
</div>

     <div className='view p-3'>
      {gitList.length>0?
        <table className="table table-striped">
        <thead>
          <tr>
            <th className="table-head test2" scope="col">#</th>
            <th className='table-head' scope="col">Name</th>
            <th className='table-head' scope="col">Email</th>
            <th className='table-head' scope="col">Image</th>
            <th className='table-head' scope="col">phone</th>
            <th className='table-head' scope="col">country</th>
            <th className="table-head test1" scope="col">Action</th>

          </tr>
        </thead>
        <tbody>
         {
          gitList.map((user)=>(
            <tr key={user.id}>
            <th scope="row">{user.id}</th>
            <td>{user.userName}</td>
            <td>{user.email}</td>
            <td>
                    <div className='img-container'>
                      <img className='w-100 h-100' src={`https://upskilling-egypt.com:443/`+user.imagePath} alt="" />
                    </div>
                  </td>
            <td>{user.phoneNumber}</td>
            <td>{user.country}</td>
            <td> 
  <i onClick={() => handleDelete(user.id)} className='fa fa-trash text-danger mx-2' 
  aria-hidden="true"></i></td>
          </tr>
          ))}        
        </tbody>
      </table>
      :
      <div>(<NoData/>)</div>
      }  
      <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {pageArray.map((pageNum,index)=>(
 <li key={index} className="page-item" onClick={()=>gitListUser(pageNum)}><a className="page-link" >{pageNum}</a></li>
    ))}
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav> 
     </div></>)}
    </>
  )
}
