import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss"
import { CartContext } from "../../context/cart.context";
import { useContext } from "react";


const CartIcon = () =>{

    const {cartClicked,setIsCartOpen, cartItems} = useContext(CartContext)
    const count = cartItems.reduce((prev,curr) => prev + curr.quantity, 0)

    const cartClickHandler = () =>{    
        setIsCartOpen(!cartClicked)
        console.log(cartClicked);
    }

    return (
    <div onClick={cartClickHandler} className="cart-icon-container">
        <ShoppingIcon  className="shopping-icon"/>
        <span className="item-count">{count}</span>
    </div>
  );
}

export default CartIcon;