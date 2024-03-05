import React, { useEffect ,useState} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../../../SharedModule/Component/Header/Header.jsx'
import axios from 'axios';
import noData from "../../../assets/image/Group no.svg";
import NoData from '../../../SharedModule/Component/NoData/NoData.jsx';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Delete from '../../../SharedModule/Component/Delete/Delete.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../SharedModule/Component/Loading/Loading.jsx';

export default function Recipes() {
 const loginData=JSON.parse(localStorage.getItem("adminData"));
  const [show, setShow] = useState(false);
  const [modalState, setModalState] = useState(false);
  const {register,handleSubmit,setValue,formState:{errors}}=useForm();
  const handleClose = () => setModalState(false);
  const handleShow = () => setShow(true);
  const [recipeList,setRecipeList]=useState([]);
  const[pageArray,setPageArray]=useState([]);  

const [recipeId,setRecipeId]=useState([]);
const[categoryList,setCategoryList]=useState([]);
  const[tagList,setTagList]=useState([]);
  const [getName,setGetName]=useState("");
  const [getTag,setGetTag]=useState("");
  const [getCategory,setGetCategory]=useState("");
  const [isloading, setisLoading] = useState(false)

 const navigate=useNavigate();
 const navigateToRecipesForm=()=>{
  navigate('/dashboard/recipesForm');
 }
const handelDelete=(id)=>{
setRecipeId(id);
setShow(true);
setModalState("delete");
}

  let gitRecipeList=async(pageSize,pageNum,name,TagId,catId)=>{
    let token=localStorage.getItem("admin");
   try {
    setisLoading(true);
    let response=await axios.get
    ('https://upskilling-egypt.com:443/api/v1/Recipe/',
   { params:{pageNumber:pageNum,
      pageSize:pageSize,name:name
      ,tagId:TagId,categoryId:catId}
    ,headers:{Authorization:token}});
    setPageArray(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1)
)
    setRecipeList(response?.data?.data);
    setisLoading(false);
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
  let gitCategoryList=async()=>{
    let token=localStorage.getItem("admin");
   try {
    let response=await axios.get
    ('https://upskilling-egypt.com:443/api/v1/Category/'
    ,{headers:{Authorization:token}});
    setCategoryList(response?.data?.data);
    console.log(response.data.data);
   } catch (error) {
    console.log(error)
   }
  }

  let gitTagsList=async()=>{
    let token=localStorage.getItem("admin");
   try {
    let response=await axios.get
    ('https://upskilling-egypt.com:443/api/v1/tag/'
    ,{headers:{Authorization:token}});
    setTagList(response?.data);
    console.log(response.data);
   } catch (error) {
    console.log(error)
   }
  }

  const getNameValue=(data)=>{
setGetName(data.target.value);
console.log(data.target.value)
gitRecipeList(5,1,data.target.value,getTag,getCategory);

  }

  const getTagValue=(select)=>{
    setGetTag(select.target.value);
    console.log(select.target.value)
    gitRecipeList(5,1,select.target.value,getName,getCategory);
    
      }
     
      const getCategoryValue=(select)=>{
        setGetCategory(select.target.value);
        gitRecipeList(5,1,select.target.value,getName,getTag);
        
          } 
   const AddToFavourite=async(recipeId)=>{
    let token=localStorage.getItem("admin");
    try {
     let response=await axios.post
     ('https://upskilling-egypt.com:443/api/v1/userRecipe/',{recipeId:recipeId}
     ,{headers:{Authorization:token}});
     setTimeout(()=>{
      toast.success("Add To Favorite Successful",{autoClose: 5000}),1000
     }) 
  
     console.log(response);
    } catch (error) {
     console.log(error)
    }
   }       
 useEffect(()=>{
  gitRecipeList(5,1);
  gitCategoryList();
   gitTagsList();}
          ,[])

  return (
    <>
  <ToastContainer />
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
      
        <Header   
    tittle={"welcome recipe"}
    description={"This is a welcoming screen for the entry of the application , you can now see the options"}
    />    
      {isloading?<Loading/>: <>  <div className='tittle d-flex justify-content-between p-4'>
       
<div className='detail-recipe'>
  <h6>Recipes table detail</h6>
  <p>you can check all detail</p>
</div>
<div className='text-center'>
<button className='btn btn-success' onClick={navigateToRecipesForm}>Add New Recipes</button>
</div>
</div>
<div className='selects-recipe row p-3'>
<div className='col-md-6'>
  <div>
    <input type='text' className='form-control mb-3' onChange={getNameValue} placeholder='Select By Name'/>
  </div>
</div>
<div className="col-md-3">
<select  className="form-control" onChange={getTagValue}> 
<option value="">Choose your Tag</option>
{tagList?.map((item,index)=>(
<option key={index} value={item.id}>{item.name}</option>
 ))}</select>
</div>
<div className="col-md-3">
<select  className="form-control" onChange={getCategoryValue} > 
<option value="">Choose your Category</option>
{categoryList?.map((item,index)=>(
<option key={index} value={item.id}>{item.name}</option>
 ))}</select>
</div>
        </div>
      
     <div className='tableList p-3'>
      {recipeList.length>0?(
    <table className="table table-striped ">
  <thead >
    <tr>
    <th className="table-head test2" scope="col">#</th>
            <th className="table-head  " scope="col">Name</th>
            <th className="table-head" scope="col">Description</th>
            <th className="table-head" scope="col">Image</th>
            <th className="table-head" scope="col">price</th>
            <th className="table-head" scope="col">category</th>
            <th className="table-head test1" scope="col">Action</th>

    </tr>
  </thead>
  <tbody>
    {recipeList.map((meal,index)=>(
 <tr key={index}>
   <th scope="row">{meal.id}</th>
            <td>{meal.name}</td>
            <td>{meal.description}</td>
            <td>
                    <div className='img-container'>
                      <img className='w-100 h-100' src={`https://upskilling-egypt.com:443/`+meal.imagePath} alt="" />
                    </div>
                  </td>
                  <td>{meal.price}</td>
            <td>{meal.category[0]?.name}</td>  
            {loginData?.userGroup=="SuperAdmin"?

<>
<td>
  <i onClick={()=>{navigate(`/dashboard/updateRecipe/${meal.id}`);}}
   className='fa fa-edit text-warning mx-2' aria-hidden="true"> </i>

 <i onClick={()=>handelDelete(meal.id)} className='fa fa-trash text-danger mx-2' aria-hidden="true"></i>
</td>
</>
:
<td>
  <i onClick={()=>AddToFavourite(meal.id)}
   className='fa fa-heart text-danger mx-2' aria-hidden="true"> </i>
</td>
}  
 </tr>
    ))}
  </tbody>
</table>):(<NoData/>)}
<nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {pageArray.map((pageNum,index)=>(
 <li key={index} className="page-item" onClick={()=>gitRecipeList(pageNum)}><a className="page-link" >{pageNum}</a></li>
    ))}
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav> 
</div> 
     </>}
    </>
  )
}
