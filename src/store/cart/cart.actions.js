import createAction from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";



export const setIsCartOpen = (boolean) => {
    return createAction(CART_ACTION_TYPES.IS_CART_OPEN, boolean)
};

export const addItemInCheckout = (cartItems,productSelected) =>{
    const newCartItems = addCartItem(cartItems,productSelected);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}




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
     //return new array with modified cartItems/ new cart item
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



export const reduceItemsInCheckout = (cartItems,productSelected) =>{
    const newCartItems = quantityDown(cartItems,productSelected);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}

export const removeItemInCheckout = (cartItems, productSelected) =>{
    const newCartItems = removeItem(cartItems,productSelected);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}

