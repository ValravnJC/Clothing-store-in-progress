import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss"
import { CartContext } from "../../context/cart.context";
import { useContext } from "react";


const CartIcon = () =>{

    const {cartClicked,setCartClicked} = useContext(CartContext)

    const cartClickHandler = () =>{    
        setCartClicked(!cartClicked)
        console.log(cartClicked);
    }

    return (
    <div onClick={cartClickHandler} className="cart-icon-container">
        <ShoppingIcon  className="shopping-icon"/>
        <span className="item-count">0</span>
    </div>
  );
}

export default CartIcon;