import React, { useState,useEffect } from 'react'
import RecipeHeader from '../../../SharedModule/Component/RecipeHeader/RecipeHeader.jsx'
import { useForm} from 'react-hook-form'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
export default function UpdateRecipe() {
    const{register,handleSubmit,setValue,formState:{errors}}=useForm();
    const[categoryList,setCategoryList]=useState([]);
    const[tagList,setTagList]=useState([]);
    const navigate=useNavigate();
    const { mealId } = useParams();
  console.log(mealId);
    const[recipeId,setRecipeId]=useState({
        id:mealId,
        name:"",
        price:"",
        description:"",
        imagePath:"" 
});

    
//   update#######################################
  const updateCategoryList=async(data)=>{
   
    let token=localStorage.getItem("admin");
       try {
       
        let response=await axios.put
        (`https://upskilling-egypt.com:443/api/v1/Recipe/${mealId}`,data
        ,{headers:{Authorization:token}});
        navigate("/dashboard/recipes");
        console.log(response.data);
       } catch (error) {
        console.log(error)
       } 
    }
    const handleEdit = (mealId) => {
        setRecipeId(meal.id);
        setValue("Name",meal.name);
        setValue("Description",meal.description);
        setValue("imagePath",meal.imagePath);
        setValue("Price",meal.price);
        };
    // getRecipe###########################    
    const getRecipeList=async()=>{
  
        let token=localStorage.getItem("admin");
           try {
            let response=await axios.get
            (`https://upskilling-egypt.com:443/api/v1/Recipe/${mealId}`
            ,{headers:{Authorization:token}});
            console.log(response.data);
            setRecipeId({...recipeId,name:response.data.name,price:response.data.price,
                description:response.data.description,recipeImage:response.data.recipeImage,tagId:response.data.tagId,
                categoriesIds:response.data.categoriesIds} )
           } catch (error) {
            console.log(error)
           } 
        }


    let gitCategoryList=async()=>{
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
      useEffect(()=>{
        getRecipeList();
        gitCategoryList();
        gitTagsList();
      },[])
  return (
    <>
    <div className='header pt-3'>
<RecipeHeader/>
</div>
<div className="container w-75 m-auto pt-3">
<form onSubmit={handleSubmit(updateCategoryList)}>
    <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input type="text" {...register("name",{required:true,
})} className="form-control" value={recipeId.name} onChange={e=>setRecipeId({...recipeId,name:e.target.value})} placeholder="Enter recipe name"/>
  {errors.name&&<p>{errors.name.message}</p>}
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input type="number" {...register("price",{required:true,
 })} className="form-control" value={recipeId.price} onChange={e=>setRecipeId({...recipeId,price:e.target.value})} placeholder="enter your Price"/>
  {errors.price&&<p>{errors.price.message}</p>}
</div>
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input type="file" {...register("recipeImage",{
 })} className="form-control" value={recipeId.recipeImage} onChange={e=>setRecipeId({...recipeId,recipeImage:e.target.value})} placeholder="enter your image"/>
  {errors.recipeImage&&<p>{errors.recipeImage.message}</p>}
</div>
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <textarea {...register("description",{
 })} className="form-control" value={recipeId.description} onChange={e=>setRecipeId({...recipeId,description:e.target.value})} placeholder="enter your description"></textarea>
  {errors.description&&<p>{errors.description.message}</p>}
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <select {...register("categoriesIds",{required:true,
 })} className="form-control" value={recipeId.categoriesIds} onChange={e=>setRecipeId({...recipeId,tagId:e.target.value})}>{categoryList?.map((item,index)=>(
<option key={index} value={item.id}>{item.name}</option>
 ))}</select>
  {errors.categoriesIds &&<p>{errors.categoriesIds.message}</p>}
</div>
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <select {...register("tagId",{required:true,
 })} className="form-control"value={recipeId.tagId} onChange={e=>setRecipeId({...recipeId,categoriesIds:e.target.value})} >{tagList?.map((item,index)=>(
<option key={index} value={item.id}>{item.name}</option>
 ))}</select>
  {errors.tagId &&<p>{errors.tagId.message}</p>}
</div>

<button className='btn btn-success w-100 mb-3'>update</button>
    </form>
</div>
    </>
  )
}
