import "./checkout-item.component.scss"

import { useDispatch, useSelector } from "react-redux";
import { addItemInCheckout, removeItemInCheckout, reduceItemsInCheckout } from "../../store/cart/cart.actions";
import { selectCartItems } from "../../store/cart/cart.selector"; 

const CheckoutItem = ({cartItem}) =>{

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
   
    
     const {name, imageUrl, price , quantity} = cartItem;
     const removeItem =  () => dispatch(removeItemInCheckout(cartItems, cartItem));
     const addItem = () => dispatch(addItemInCheckout(cartItems, cartItem));
     const reduceItem = () => dispatch(reduceItemsInCheckout(cartItems, cartItem));
    return (
        <div className="checkout-item-container">
         <div className="image-container">
            <img src={imageUrl} alt={`${name}`} />
         </div>
        <span className="name">{name}</span>
        <span className="quantity">
        <div className="arrow" onClick={reduceItem}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItem}>&#10095;</div>
        </span>
        <span className="price">${price}</span>
            <div className="remove-button" onClick={removeItem}>
            &#10005;
            </div> 
        </div>
    );
}

export default CheckoutItem;