import React from "react";
import bag from "../assets/bag.jpg";
import { Link } from "react-router-dom";

const Card = ({ id, name, price, seller }) => {
  return (
    <div className="flex  flex-col    items-center ">
      <div className="shadow-md  mb-5 ">

        <Link to={`/products/${id}`}>
          <div className="h-52 w-72">
            <img src={bag} alt="logo" height="350" className="w-full h-full object-fill" />
          </div>
        </Link>
        <div className="p-5">
          <h1 className="py-5 font-bold text-xl">{name}</h1>

          <ul className="pb-5">
            <li>
              {" "}
              <span className="font-bold">Price: </span> {price}
            </li>
            <li>
              {" "}
              <span className="font-bold"> Sold by: {seller} </span>
              
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Card;
