import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import Header from '../../../SharedModule/Component/Header/Header.jsx';
import noData from "../../../assets/image/Group no.svg";
import Delete from '../../../SharedModule/Component/Delete/Delete.jsx';
import NoData from '../../../SharedModule/Component/NoData/NoData.jsx';

export default function Category() {
  const [show, setShow] = useState(false);
  const [modalState, setModalState] = useState(false);

  const handleClose = () => setModalState(false);
  const handleShow = () => setShow(true);
  
  const [categoryId,setCategoryId]=useState(0);
  const[categoryList,setCategoryList]=useState([]);  
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

let gitCategory=async()=>{
  let token=localStorage.getItem("admin");
 try {
  let response=await axios.get
  ('https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1'
  ,{headers:{Authorization:token}});
  setCategoryList(response?.data?.data);
  console.log(response.data.data);
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
useEffect(()=>{
  gitCategory();
},[])
  return (
    <>
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
          <Modal.Title>delete Category</Modal.Title>
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
    description={"This is a welcoming screen for the entry of the application , you can now see the options"}
    />
    <div className='categoryContainers'>
<div className='tittle d-flex justify-content-between p-4'>
<div className=''>
  <h6>category table detail</h6>
  <p>you can check all detail</p>
</div>
<div className='text-center'>
<button className='btn btn-success' onClick={handleAdd}>Add New Category</button>
</div>
</div>
<div className='categoryTable'>
  {categoryList.length>0?(
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Category Name</th>
      <th scope="col">Update</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
     {categoryList.map((item)=>(
<tr  key={item.id}>
  <th scope="row">{item.id}</th>
  <td>{item.name}</td>
  <td><button onClick={()=>handleEdit(item)} className='btn btn-warning'>Update</button></td>
  <td><button onClick={() => handleDelete(item.id)} className='btn btn-danger'>Delete</button></td>
</tr>
     ))}
  </tbody>
</table>
  )
    :(<NoData/>)}
</div>
    </div>
    </>
  )
}
