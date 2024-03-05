import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RecipeHeader() {
    const navigate=useNavigate();
    const navigateToRecipe=()=>{
        navigate("/dashboard/recipes")
    }
  return (
    <>
     <div className='container-fluid bg-light  p-5'>
      <div className="row gy-4 ">
<div className="col-md-8">
  <div>
  <h4>Fill the <span style={{color:"green"} }>Recipe</span>!</h4>
  <p style={{fontSize:"20px"}}>you can now fill the meals easily using the table and form ,
     click here and sill it with the table !</p>
  </div>
</div>
<div className="col-md-4 d-flex justify-content-end">
  <div>
  <button onClick={navigateToRecipe} className='btn btn-success'>Fill Recipe <i className="fa-solid fa-arrow-right"></i></button>
  </div>

</div>

      </div>
     </div>
    </>
  )
}
