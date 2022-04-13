import { createContext, useState } from "react";

export const CartContext = createContext({
    cartClicked: false,
    setCartClicked: () => {}
});

export const CartProvider = ({children}) =>{
    const  [cartClicked, setCartClicked] = useState(false)
    const value = {cartClicked, setCartClicked}


    return <CartContext.Provider value={value}> {children} </CartContext.Provider>
}

