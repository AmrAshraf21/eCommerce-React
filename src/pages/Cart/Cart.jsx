import React, { useContext } from "react";
import { CartContext } from "../../components/context/CartContext/CartContext";

function Cart() {
	const { cartItems, setCartItems,totalQuantity } = useContext(CartContext);
	const productsInCart = cartItems.filter((item) => item.count >= 1);
console.log(cartItems);



	const increase = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, count: item.count + 1 }
          : item
      )
    );
  };

  const decrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };
  const clear = ()=>{
    if((window.confirm('"Are you sure you want to clear the cart?"')))setCartItems([]);
  }

	return (
		<div className="container">
      <h2>My Cart</h2>

      {productsInCart.length === 0 ? (
        <p className="text-danger">Cart is Empty</p>
      ) : (
        productsInCart.map((item) => (
          <div
            key={item.id}
            className="card mb-3 p-3 d-flex flex-row align-items-center"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              style={{
                width: "100px",
                height: "auto",
                marginRight: "20px",
              }}
            />
            <div className="flex-grow-1">
              <h5>{item.title}</h5>
              <p>{item.description}</p>
              <p className="text-success">${item.price}</p>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => decrease(item.id)}
                >
                  -
                </button>
                <span>{item.count}</span>
                <button
                  className="btn btn-primary ms-2"
                  onClick={() => increase(item.id)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <hr />
      <h4>Total Items in Cart: {totalQuantity}</h4>
     {cartItems.length>0 &&<button className="btn btn-danger" onClick={clear}>Clear Cart</button>}
    </div>
	);
}

export default Cart;
