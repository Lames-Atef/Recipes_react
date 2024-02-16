import React from 'react'
import rectangle from "../../../assets/image/gilr2.png"
export default function Header({tittle,description}) {
  return (
    <>
<div className='container-fluid'>
    <div className='row justify-content-between'>
<div className='col-md-5'>
<div>
  <h2>{tittle}</h2>
  <p>{description}</p>
</div>
<div className="col-md-3">
  <div>
    <img src={rectangle}/>
  </div>
</div>
<div >
</div>
</div>
    </div>
</div>
    </>
  )
}
