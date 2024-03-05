import React from 'react'
import noData from "../../../assets/image/Group no.svg";

export default function Delete() {
  return (
    <>
 <div className="input-group  mb-3">
  
<div className="text-center">
<img src={noData} className='w-50 ' alt=""/>
<h4 className='p-3 ' >Delete this item?</h4>
<p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
</div>
</div>

    </>
  )
}
