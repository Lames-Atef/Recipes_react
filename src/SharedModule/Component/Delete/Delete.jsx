import React from 'react'
import noData from "../../../assets/image/Group no.svg";

export default function Delete() {
  return (
    <>
 <div className="input-group text-center mb-3">
  <img src={noData} className='w-50' alt=""/>
<h4 className='my-3'>Delete this item?</h4>
<p className='text-muted'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis molestiae dicta
   laudantium voluptate maxime atque, ab ut soluta magnam numquam.</p>
</div>

    </>
  )
}
