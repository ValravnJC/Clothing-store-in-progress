import "./checkout-item.component.scss"
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const CheckoutItem = ({cartItem}) =>{

    const {addItemInCheckout,reduceItemsInCheckout, removeItemInCheckout} = useContext(CartContext);
    
     const {name, imageUrl, price , quantity} = cartItem;
     const removeItem =  () => removeItemInCheckout(cartItem)
     const addItem = () => addItemInCheckout(cartItem)
     const reduceItem = () => reduceItemsInCheckout(cartItem)
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
        <span className="price">{price}</span>
            <div className="remove-button" onClick={removeItem}>
            &#10005;
            </div> 
        </div>
    );
}

export default CheckoutItem;