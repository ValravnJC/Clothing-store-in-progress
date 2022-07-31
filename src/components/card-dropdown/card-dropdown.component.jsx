import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./card-dropdown.styles.scss"
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { Link } from "react-router-dom";


const CardDropdown = () => {

    const {cartItems,setCartClicked} = useContext(CartContext);

    const hideCart = () => {
        setCartClicked(false)
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