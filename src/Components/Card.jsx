import React from "react";
import us from "../assets/us.png";
import { Link } from "react-router-dom";

const Card = ({ name, price, seller }) => {
  return (
    <div className="flex  flex-col    items-center ">
      <div className="shadow-md  mb-5 ">

        <Link to={`/${name}`}>
          <div className="h-52 w-72">
            <img src={us} alt="logo" height="350" className="w-full h-full object-fill" />
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
