import React, { useState,useEffect } from 'react'
import RecipeHeader from '../../../SharedModule/Component/RecipeHeader/RecipeHeader.jsx'
import { useForm} from 'react-hook-form'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function RecipesForm() {
  const{register,handleSubmit,setValue,formState:{errors}}=useForm();
  const[categoryList,setCategoryList]=useState([]);
  const[tagList,setTagList]=useState([]);
  

  const AppendToFormData=(data)=>{
let formData=new FormData();
formData.append("name",data.name);
formData.append("price",data.price);
formData.append("description",data.description);
formData.append("recipeImage",data.recipeImage[0]);
formData.append("tagId",data.tagId);
formData.append("categoriesIds",data.categoriesIds);
return formData;
  }
  const submitData=async(data)=>{
let recipeAppendForm=AppendToFormData(data);
let token=localStorage.getItem("admin");
   try {
    let response=await axios.post
    ('https://upskilling-egypt.com:443/api/v1/Recipe/',recipeAppendForm
    ,{headers:{Authorization:token}});
    console.log(response.data);
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
    gitCategoryList();
    gitTagsList();
  },[])
  return (
    <>
<div className='header pt-3'>
<RecipeHeader/>
</div>
<div className="container w-75 m-auto pt-3">
<form onSubmit={handleSubmit(submitData)}>
    <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input type="text" {...register("name",{required:true,
})} className="form-control" placeholder="Enter recipe name"/>
  {errors.name&&<p>{errors.name.message}</p>}
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input type="number" {...register("price",{required:true,
 })} className="form-control" placeholder="enter your Price"/>
  {errors.price&&<p>{errors.price.message}</p>}
</div>
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <input type="file" {...register("recipeImage",{
 })} className="form-control" placeholder="enter your image"/>
  {errors.recipeImage&&<p>{errors.recipeImage.message}</p>}
</div>
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <textarea {...register("description",{
 })} className="form-control" placeholder="enter your description"></textarea>
  {errors.description&&<p>{errors.description.message}</p>}
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <select {...register("categoriesIds",{required:true,
 })} className="form-control" >{categoryList?.map((item,index)=>(
<option key={index} value={item.id}>{item.name}</option>
 ))}</select>
  {errors.categoriesIds &&<p>{errors.categoriesIds.message}</p>}
</div>
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-key fa"  aria-hidden="true"></i></span>
  <select {...register("tagId",{required:true,
 })} className="form-control" >{tagList?.map((item,index)=>(
<option key={index} value={item.id}>{item.name}</option>
 ))}</select>
  {errors.tagId &&<p>{errors.tagId.message}</p>}
</div>

<button className='btn btn-success w-100 mb-3'>Save</button>
    </form>
</div>
    </>
  )
}
