import React, { useMemo, useState } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [quantity,setQuantity] = useState(0);
const totalQuantity = useMemo(()=>{
    return cartItems.reduce((sum,item)=> sum + item.count,0)
},[cartItems])
    
  return (
    <CartContext.Provider value={{ cartItems, setCartItems ,totalQuantity,setQuantity,quantity}}>
      {children}
    </CartContext.Provider>
  );
}
