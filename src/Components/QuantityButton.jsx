import React, { useState } from 'react';

const QuantityButton = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
        onClick={() => setQuantity(quantity - 1)}
      >
        -
      </button>
      <span className="bg-gray-200 text-gray-700 py-2 px-4">{quantity}</span>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        onClick={() => setQuantity(quantity + 1)}
      >
        +
      </button>
    </div>
  );
};

export default QuantityButton;
