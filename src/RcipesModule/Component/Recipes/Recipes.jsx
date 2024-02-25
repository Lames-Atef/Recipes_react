import React, { useEffect ,useState} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../../../SharedModule/Component/Header/Header.jsx'
import axios from 'axios';
import noData from "../../../assets/image/Group no.svg";
import NoData from '../../../SharedModule/Component/NoData/NoData.jsx';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Delete from '../../../SharedModule/Component/Delete/Delete.jsx';


export default function Recipes() {
  const [show, setShow] = useState(false);
  const [modalState, setModalState] = useState(false);
  const {register,handleSubmit,setValue,formState:{errors}}=useForm();
  const handleClose = () => setModalState(false);
  const handleShow = () => setShow(true);
  const [recipeList,setRecipeList]=useState([]);
const [recipeId,setRecipeId]=useState([]);
 const navigate=useNavigate();
 const navigateToRecipesForm=()=>{
  navigate("/dashboard/recipesForm");
 }
const handelDelete=(id)=>{
setRecipeId(id);
setShow(true);
setModalState("delete");
}
  let gitRecipeList=async()=>{
    let token=localStorage.getItem("admin");
   try {
    let response=await axios.get
    ('https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=10&pageNumber=1'
    ,{headers:{Authorization:token}});
    setRecipeList(response?.data?.data);
    console.log(response.data.data);
   } catch (error) {
    console.log(error)
   }
  }

  let deleteRecipe=async()=>{
    let token=localStorage.getItem("admin");
   try {
    let response=await axios.delete
    (`https://upskilling-egypt.com:443/api/v1/Recipe/${recipeId}`
    ,{headers:{Authorization:token}});
    gitRecipeList();
    handleClose();
    console.log(response?.data);
   } catch (error) {
    console.log(error)
   }
  }
  useEffect(()=>{
    gitRecipeList();
  }
  ,[])
  return (
    <>
    <Header 
    tittle={"welcome recipe"}
    description={"This is a welcoming screen for the entry of the application , you can now see the options"}
    />
<Modal show={modalState=="delete"} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>delete Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(deleteRecipe)}>
         <Delete/>
<button className='btn btn-outline-danger' onClick={deleteRecipe} >Delete item</button>
          </form>
        </Modal.Body>
      </Modal>
      <div className='tittle d-flex justify-content-between p-4'>
<div className=''>
  <h6>Recipes table detail</h6>
  <p>you can check all detail</p>
</div>
<div className='text-center'>
<button className='btn btn-success' onClick={navigateToRecipesForm}>Add New Recipes</button>
</div>
</div>
<div className='tableList'>
      {recipeList.length>0?(
        <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Image</th>
            <th scope="col">price</th>
            <th scope="col">category</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>

          </tr>
        </thead>
        <tbody>
         {recipeList.map((meal)=>(
            <tr key={meal.id}>
            <th scope="row">{meal.id}</th>
            <td>{meal.name}</td>
            <td>{meal.description}</td>
            <td>{meal.imagePath ?<img className='w-25' src={`https://upskilling-egypt.com/${meal.imagePath}`}/>:
            <div className='text-center'><img src={noData} className='w-25'/></div>}</td>
            <td>{meal.price}</td>
            <td>{meal.category[0]?.name}</td>
<td>
  <i className='fa fa-edit text-warning mx-2' aria-hidden="true"></i>
</td>
<td> <i onClick={()=>handelDelete(meal.id)} className='fa fa-trash text-danger mx-2' aria-hidden="true"></i>
</td>
          </tr>
          ))}        
        </tbody>
      </table>)
      :
    (<NoData/>)
      }   
     </div>
    </>
  )
}
