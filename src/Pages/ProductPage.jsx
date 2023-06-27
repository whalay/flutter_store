import React from 'react'
import Category from '../Components/Category'
import Card from '../Components/Card'
import { productdb } from '../assets/Data'





const ProductPage = () => {
    return (
        <div><Category />
            <div className='md:relative'>
            {/* <div className=' absolute left-40 flex flex-col flex-wrap sm:flex-row justify-between  sm:gap-5 sm:px-14 '> */}
                <div className='lg:absolute lg:left-60 grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {productdb.map((product, index) => {
                    return (<Card key={index} name={product.product_name} price={product.price} seller={product.seller_name} />
                    )
                })}
            </div>
            </div>

        </div>
    )
}

export default ProductPage