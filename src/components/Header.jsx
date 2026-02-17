import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const { cart, addToCart, totalQuantity, removeFromCart } =
    useContext(CartContext);
  const [showCart, setShowCart] = useState(false);
  return (
    <header className="border mb-10 min-h-[60px] px-24 flex items-center justify-between">
      <a className="/">Logo</a>
      <div className="flex items-start relative">
        <img
          src="/assets/icons/cart-icon.svg"
          alt="cart"
          width={25}
          height={25}
          onClick={() => setShowCart((prev) => !prev)}
        />
        <div className="bg-stone-900 text-white rounded-full flex justify-center items-center w-[20px] h-[20px]">
          {totalQuantity}
        </div>

        {showCart && totalQuantity > 0 && (
          <ul className="border bg-white rounded-md max-w-[250px] w-100 p-3 absolute right-0 top-10">
            {cart.map((item) => (
              <li key={item.id}>
                <div className="flex justify-between items-center">
                  <h3>{item.title}</h3>
                  <h4>{item.quantity}</h4>
                </div>
                <div className="mt-2 flex gap-x-2">
                  <button
                    className="border rounded-sm cursor-pointer leading-none w-[20px] h-[20px] flex items-center justify-center"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                  <button
                    className="border rounded-sm cursor-pointer leading-none w-[20px] h-[20px] flex items-center justify-center"
                    onClick={() => removeFromCart(item)}
                  >
                    -
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
