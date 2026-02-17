import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductsList = ({ products }) => {
  const { addToCart } = useContext(CartContext);
  return (
    <ul className="flex gap-4">
      {products.map((item) => (
        <li
          key={item.id}
          className="p-3 rounded-sm shadow-sm w-[250px] min-h-[200px]"
        >
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <button
            className="border px-1 rounded-sm mt-5 cursor-pointer"
            onClick={() => addToCart(item)}
          >
            Add To Cart
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ProductsList;
