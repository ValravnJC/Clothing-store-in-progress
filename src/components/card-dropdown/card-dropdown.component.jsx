import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./card-dropdown.styles.scss"
import { selectCartIsOpen, selectCartItems } from "../../store/cart/cart.selector"; 
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.actions";

const CardDropdown = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartClicked = useSelector(selectCartIsOpen) 

    const hideCart = () => {
        dispatch(setIsCartOpen(!cartClicked));
    }
    
    return (
         <div className="cart-dropdown-container">
            <div className="cart-items">
            {cartItems.map((item) => (
                <CartItem key={item.id} cartItem={item} />
            ))}
            </div>
                <Link to="/checkout" onClick={hideCart}>
                    <Button>Go to Checkout</Button>
                </Link>
        </div>
    );
}

export default CardDropdown;