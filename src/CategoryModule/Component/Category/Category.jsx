import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import Header from '../../../SharedModule/Component/Header/Header.jsx';
import Delete from '../../../SharedModule/Component/Delete/Delete.jsx';
import NoData from '../../../SharedModule/Component/NoData/NoData.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../SharedModule/Component/Loading/Loading.jsx';

export default function Category() {
  const [show, setShow] = useState(false);
  const [modalState, setModalState] = useState(false);

  const handleClose = () => setModalState(false);
  const handleShow = () => setShow(true);
  const [gitName,setGitName]=useState("")
  const [categoryId,setCategoryId]=useState(0);
  const[categoryList,setCategoryList]=useState([]);  
  const[pageArray,setPageArray]=useState([]);  
  const [isloading, setisLoading] = useState(false)

  const {register,handleSubmit,setValue,formState:{errors}}=useForm();
  const handleEdit = (item) => {
  setCategoryId(item.id);
  setValue("name",item.name);
    setModalState("update")
  };
  const handleDelete=(id)=>{
    setCategoryId(id);
setShow(true);
setModalState("delete");
  }
  const handleAdd=()=>{

setModalState("add");
  }
  

const addNewCategory=async(data)=>{
  let token=localStorage.getItem("admin");
  try {
    let response=await axios.post 
    ("https://upskilling-egypt.com:443/api/v1/Category/"
    ,data,
    {headers:{Authorization:token}});
    gitCategory();
    handleClose();
   } catch (error) {
    console.log(error)
   }
}

let gitCategory=async(pageNum,pageSize,name)=>{
  let token=localStorage.getItem("admin");
 try {
  setisLoading(true);
  let response=await axios.get
  ('https://upskilling-egypt.com:443/api/v1/Category/'
  ,{headers:{Authorization:token},
params:{pageSize:pageSize,
pageNumber:pageNum,
name:name}});
setPageArray(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1));

  setCategoryList(response?.data?.data);
  console.log(response);
  setisLoading(false);
 } catch (error) {
  console.log(error)
 }
}
const updateCategory=async(data)=>{
  let token=localStorage.getItem("admin");
try {
  let response=await axios.put
  (`https://upskilling-egypt.com:443/api/v1/Category/${categoryId}`,
data,
  {headers:{Authorization:token}})
    gitCategory();
    handleClose();

} catch (error) {
  console.log(error)
}
}
const deleteCategory=async()=>{
  let token=localStorage.getItem("admin");
  try {
    let response=await axios.delete
    (`https://upskilling-egypt.com:443/api/v1/Category/${categoryId}`,
    {headers:{Authorization:token}});
  gitCategory();
    handleClose();
   } catch (error) {
    console.log(error)
   }
}
const gitNameValue=(data)=>{
  setGitName(data.target.value);
  gitCategory(1,5,data.target.value,gitName)
}
useEffect(()=>{
  gitCategory(1,5);
},[])
  return (
    <>
    <ToastContainer />
      <Modal show={modalState=="add"} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(addNewCategory)}>
          <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input type="text" {...register("name",{required:true,
  pattern:{
        message:"category is required"
  }})} className="form-control" placeholder="Enter category"/>
  {errors.name&&<p>{errors.name.message}</p>}
</div>
<button className='btn btn-success' onClick={addNewCategory} >save</button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={modalState=="delete"} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(deleteCategory)}>
         <Delete/>
<button className='btn btn-outline-danger' onClick={deleteCategory} >Delete item</button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={modalState=="update"} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(updateCategory)}>
          <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input  type="text" {...register("name",{required:true,
  pattern:{
        message:"category is required"
  }})} className="form-control" placeholder="Enter category"/>
  {errors.name&&<p>{errors.name.message}</p>}
</div>
<button className='btn btn-success' onClick={updateCategory} >update category</button>
          </form>
        </Modal.Body>
      </Modal>

    <Header 
    tittle={"welcome category"}
    description={"You can now add your items that any user can order it from the Application and you can edit"}
    />
      {isloading?<Loading/>: (
    <div className='categoryContainers'>
<div className='tittle d-flex justify-content-between p-3'>
<div className='text-center'>
  <h4>category table detail</h4>
  <p style={{fontSize:"20px"}}>you can check all detail</p>
</div>
<div className='text-center'>
<button className='btn btn-success' onClick={handleAdd}>Add New Category</button>
</div>
</div>
<div className='filter p-3 '>
<div className='col-md-9 text-center m-auto '>
  <div>
    <input type='text' className='form-control mb-3' onChange={gitNameValue}  placeholder='Select By Name'/>
  </div>
</div>

</div>
<div className='categoryTable p-3 text-center'>
  {categoryList.length>0?(
    <table className="table table-striped">
  <thead>
    <tr>
      <th className="table-head test2" scope="col">#</th>
      <th className='table-head' scope="col">Category Name</th>
      <th className='table-head' scope="col">Update</th>
      <th className="table-head test1"  scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
     {categoryList.map((item)=>(
<tr  key={item.id}>
  <th scope="row">{item.id}</th>
  <td>{item.name}</td>
  <td> <i onClick={()=>handleEdit(item)}
   className='fa fa-edit text-warning mx-2' aria-hidden="true"> </i></td>

  <td><i onClick={() => handleDelete(item.id)} className='fa fa-trash text-danger mx-2' aria-hidden="true"></i></td>
</tr>
     ))}
  </tbody>
</table>
  )
    :(<NoData/>)}
</div>
<nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {pageArray.map((pageNum,index)=>(
 <li key={index} className="page-item" onClick={()=>gitCategory(pageNum)}><a className="page-link" >{pageNum}</a></li>
    ))}
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
    </div>)}
    </>
  )
}
