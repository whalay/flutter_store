import React from 'react'
import Navbar from "../Components/Navbar";
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <>
      <section className='flex items-center space-between gap-10'>
        <div className=' flex flex-col gap-12'>
          <h1 className='text-6xl font-bold'>Shop it. Love it</h1>
          <p className='text-4xl'>Sell , buy, display everything
            products online and equally grow your business/brand</p>
          <div>
            <Link to="register">
              <button className='bg-blue-500 p-3 text-white text-2xl m-4'>Create a free Account </button>
            </Link>
            <Link to="market">
              <button className='bg-blue-500 p-3 text-white text-2xl m-4'>Buy Now</button>
            </Link>
          </div>
        </div>
        <img src="src/assets/Famasi.png" alt="" />

      </section>
    </>
  )
}

export default Homepage