import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx"
import Category from './Category'

const Hamburger = () => {

    const [isOpen, setIsOpen] = useState(false)

    const hamburgerHandler = () => {
        setIsOpen((isOpen) => !isOpen)
    }

    const closeNav = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <RxHamburgerMenu onClick={hamburgerHandler}  className='z-20'/>
            {isOpen && <Category nav={isOpen} close={closeNav}/>}
        </div>
    )
}

export default Hamburger