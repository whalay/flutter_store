import React from 'react'
import { useParams } from 'react-router-dom';
import { productdb } from '../assets/Data'
import QuantityButton from '../Components/QuantityButton';
import us from "../assets/us.png";
const ProductDetail = () => {
    const { product_name } = useParams();
    const product = productdb.find((product) => product.name === product_name);

    if (!product) {
        return <div>Product not found!</div>;
    }

    
    return (
        <div className='md:px-14 p-5 h-screen'>
            <div className="flex flex-col md:flex-row  md:items-center justify-between gap-10   ">
                <div className="md:basis-1/2 flex ">
                    <img src={us} alt="" className="flex-grow" />
                </div>

                <div className="flex flex-col     md:px-0 md:basis-1/2">
                    <h1 className="text-xl font-bold py-5">{product.product_name}</h1>
                    <p className='text-2xl font-bold'>{product.price}</p>
                    <div className="py-5">
                        <h3 className='py-2'>Quantity:</h3>
                        <QuantityButton />
                    </div>
                    <button className='bg-blue-500 p-3 text-white text-2xl my-4'>Add to Cart</button>

                </div>


            </div>


        </div>
    )
}

export default ProductDetail