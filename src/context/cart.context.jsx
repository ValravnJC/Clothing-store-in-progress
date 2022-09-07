import { createContext, useReducer } from "react";
import createAction from "../utils/reducer/reducer.utils.js"

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
    cartCount: 0,
    cartClicked: false,
    setIsCartOpen: () => {},
    cartTotal: 0,
    setCartTotal: () => {},
    cartItems: [],
    addItemToCart: () => {},
    addItemInCheckout: () => {},
    reduceItemsInCheckout: () => {},
    removeItemInCheckout: () => {}
});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    IS_CART_OPEN: 'IS_CART_OPEN'
}

const INITIAL_STATE = {
    cartClicked: false,
    cartTotal: 0,
    cartItems: [],
    cartCount: 0,

}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.IS_CART_OPEN:
            
            return {
                ...state,
                cartClicked: payload,
            };

        default:
            throw new Error (`unhandeled type of ${type} in cartReducer`)
    }
}

export const CartProvider = ({children}) =>{

const [{cartClicked,cartItems, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

 const updateCartItemsReducer = (newCartItems) => {
     const newCartTotal = newCartItems.reduce(
           (total, cartItem) => total + cartItem.quantity * cartItem.price,
           0
       );
       const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

       dispatch(
        createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}))

   }

    const addItemToCart = (productToAdd) =>{
        const newCartItems = addCartItem(cartItems,productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const addItemInCheckout = (productSelected) =>{
        const newCartItems = quantityUp(cartItems,productSelected);
        updateCartItemsReducer(newCartItems);
    }

    const reduceItemsInCheckout = (productSelected) =>{
        const newCartItems = quantityDown(cartItems,productSelected);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemInCheckout = (productSelected) =>{
        const newCartItems = removeItem(cartItems,productSelected);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) =>{
        dispatch(
            createAction(CART_ACTION_TYPES.IS_CART_OPEN, bool));
    }

   

    const value = {cartClicked, setIsCartOpen, addItemToCart, cartItems, addItemInCheckout, reduceItemsInCheckout, removeItemInCheckout,cartTotal};



    return <CartContext.Provider value={value}> {children} </CartContext.Provider>
}

