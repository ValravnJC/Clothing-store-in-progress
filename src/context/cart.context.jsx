import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { createContext, useEffect, useState } from "react";

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

const quantityUp = (cartItems,productSelected) =>{

    return cartItems.map((cartItem) => cartItem.id === productSelected.id ?
        {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
    );
        
}

const quantityDown = (cartItems,productSelected) =>{
    // find if cartItems contains productToAdd
    
    return cartItems.map((cartItem) => cartItem.id === productSelected.id ?
        {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );
}

const removeItem = (cartItems,productSelected) =>{
    // find if cartItems contains productToAdd
    return cartItems.filter((cartItem) => cartItem.id !== productSelected.id)
}

export const CartContext = createContext({
    cartClicked: false,
    setCartClicked: () => {},
    cartTotal: 0,
    setCartTotal: () => {},
    cartItems: [],
    addItemToCart: () => {},
    addItemInCheckout: () => {},
    reduceItemsInCheckout: () => {},
    removeItemInCheckout: () => {}
});

export const CartProvider = ({children}) =>{
    const  [cartClicked, setCartClicked] = useState(false)
    const  [cartItems, setCartItems] = useState([])
    const  [cartTotal, setCartTotal] = useState();

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );
        setCartTotal(newCartTotal)
    }, [cartItems])


    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems,productToAdd));
    }

    const addItemInCheckout = (productSelected) =>{
        setCartItems(quantityUp(cartItems,productSelected));
    }

    const reduceItemsInCheckout = (productSelected) =>{
        setCartItems(quantityDown(cartItems,productSelected));
    }

    const removeItemInCheckout = (productSelected) =>{
        setCartItems(removeItem(cartItems,productSelected));
    }


    const value = {cartClicked, setCartClicked, addItemToCart, cartItems, addItemInCheckout, reduceItemsInCheckout, removeItemInCheckout,cartTotal};



    return <CartContext.Provider value={value}> {children} </CartContext.Provider>
}

