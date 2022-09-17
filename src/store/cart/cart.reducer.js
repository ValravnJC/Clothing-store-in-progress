import { CART_ACTION_TYPES } from "./cart.types";

export const CART_INITIAL_STATE = {
    cartClicked: false,
    cartItems: [],
}

export const cartReducer = (state = CART_INITIAL_STATE, action = {} ) => {
    const {type, payload} = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            
            return {
                ...state,
                cartItems: payload,
            };
        case CART_ACTION_TYPES.IS_CART_OPEN:
            
            return {
                ...state,
                cartClicked: payload,
            };
            case CART_ACTION_TYPES.SET_CART_TOTAL:
            
            return {
                ...state,
                cartTotal: payload,
            };

        default:
            return state;
    }
}