import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss"

import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.actions";
import { selectCartIsOpen, selectCartCount } from "../../store/cart/cart.selector"; 

const CartIcon = () =>{

    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const cartClicked = useSelector(selectCartIsOpen) 

    const cartClickHandler = () =>{    
        dispatch(setIsCartOpen(!cartClicked))
        console.log(cartClicked);
    }

    return (
    <div onClick={cartClickHandler} className="cart-icon-container">
        <ShoppingIcon  className="shopping-icon"/>
        <span className="item-count">{cartCount}</span>
    </div>
  );
}

export default CartIcon;