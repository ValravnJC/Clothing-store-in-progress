import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) =>{
    // find if cartItems contains productToAdd
    const itemFound = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
 
    // if found, increment quantity
    if (itemFound){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
        {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
        );
    }
    // return new array with modified cartItems/ new cart item
    return [...cartItems, {...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
    cartClicked: false,
    setCartClicked: () => {},
    cartItems: [],
    addItemToCart: () => {}

});

export const CartProvider = ({children}) =>{
    const  [cartClicked, setCartClicked] = useState(false)
    const  [cartItems, setCartItems] = useState([])

    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems,productToAdd));
    }

    const value = {cartClicked, setCartClicked, addItemToCart, cartItems};



    return <CartContext.Provider value={value}> {children} </CartContext.Provider>
}

