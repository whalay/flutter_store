import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx"
import { Link } from 'react-router-dom'
import Hamburger from './Hamburger'

const Navbar = () => {
    return (
        <div>
            <div className='flex justify-between p-10 text-2xl '>
                <div  className='lg:hidden'>
                    <Hamburger className='' />
                </div>
                <Link to='/market'>
                    <h1 className='font-bold'>Flutterstore</h1>
                </Link>

                <ul className='lg:flex justify-between gap-10 hidden'>
                    <li>Payments</li>
                    <li>Commerce</li>
                    <li>Grow</li>
                    <li>Capital</li>
                </ul>
                <Link to='login'>
                    <button className='bg-blue-500 p-1 px-5 text-white text-lg font-bold'>Login </button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar