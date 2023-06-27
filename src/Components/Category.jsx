import React from 'react'
import { GrClose } from 'react-icons/gr';

const Category = ({ nav, close }) => {
  return (
    <div className={`${nav ? '  bg-red-500 w-full left-0 top-0 z-10 h-screen fixed' : 'lg:absolute left-10'}`}>
      {nav && <GrClose onClick={close} className=' absolute top-10 right-10'/>}
      <ul className={`${nav ? '  absolute top-10 left-10 flex flex-col   ' : 'lg:flex flex-col  hidden'} gap-10 text-xl font-bold`}>
        <li>Bag</li>
        <li>Shoe</li>
        <li>Service</li>
        <li>Fitness & health</li>
        <li>Clothes</li>
        <li>School</li>
        <li>Apparel</li>
      </ul>
    </div>
  )
}

export default Category