import React from 'react'
import rectangle from "../../../assets/image/gilr2.png"
export default function Header({tittle,description}) {
  return (
    <>
<div className='container-fluid content m-2 p-2'>
    <div className='row justify-content-between'>
<div className='col-md-5 d-flex  align-items-center'>
<div className='tittle-share-header'>
  <h2>{tittle}</h2>
  <p style={{fontSize:"20px"}}>{description}</p>
</div>
</div>
<div className="col-md-3">
  <div className='text-center'>
    <img src={rectangle}/>
  </div>
</div>

</div>
</div>
  

    </>
  )
}
