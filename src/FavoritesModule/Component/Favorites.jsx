import React, { useEffect, useState } from 'react'
import NoData from '../../SharedModule/Component/NoData/NoData.jsx';
import Header from '../../SharedModule/Component/Header/Header.jsx';
import axios from 'axios';
import Loading from '../../SharedModule/Component/Loading/Loading.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import noData from "../../assets/image/Group no.svg";
export default function Favorites() {
const [favoriteUser,setFavoriteUser]=useState([]);
const [isloading, setisLoading] = useState(false)

    let gitFavoriteList=async()=>{
        let token=localStorage.getItem("admin");
       try {
        setisLoading(true)
        let response=await axios.get
        ('https://upskilling-egypt.com:443/api/v1/userRecipe/',
       {headers:{Authorization:token}});
       
       setFavoriteUser(response?.data?.data);
        console.log(response.data.data);
        setisLoading(false);
       } catch (error) {
        console.log(error)
       }
      }
      let deleteFavorite=async(id)=>{
        let token=localStorage.getItem("admin");
       try {
        let response=await axios.delete
        (`https://upskilling-egypt.com:443/api/v1/userRecipe/${id}`
        ,{headers:{Authorization:token}});
        gitFavoriteList();
        console.log(response?.data);
        setTimeout(()=>{
          toast.success("recipe deleted from favorite",{autoClose: 5000}),1000
         }) 
       } catch (error) {
        console.log(error)
       }
      }     
      useEffect(()=>{
        gitFavoriteList();
      },[])
  return (
    <>
    <ToastContainer />
     <Header
     tittle="Welcome To Your Favorites"
     description="This is a welcoming screen for the entry of the application , you can now see the options"
     />
       {isloading?<Loading/>: (
<div className='row p-3'>
    {favoriteUser.length>0?
    favoriteUser.map((item)=>(
<div key={item.id} className="col-md-4">
<div style={{ borderRadius: 8 }} className='fav '>
<>{item.recipe.imagePath?<img className='w-100 rounded-3' src={`https://upskilling-egypt.com/${item.recipe.imagePath}`}/>:
            <div className='text-center'><img src={noData} className='w-50'/></div>}</>

<h4> <span style={{color:"#198754"}}>Name:</span>{item.recipe.name}</h4>
<p className='text-muted'><span style={{color:"#198754"}}>Dscription:</span> {item.recipe.description}</p>
<button onClick={()=>deleteFavorite(item.id)}><i  className="fa-solid fa-trash text-danger my-2 deleteFav "></i></button>
</div>
</div>
    ))
:(<NoData/>)}

</div>

       )}

    </>
  )
}
