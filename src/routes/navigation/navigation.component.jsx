import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { UserContext } from "../../context/user.context";
import "./navigation.styles.scss"
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CardDropdown from "../../components/card-dropdown/card-dropdown.component";
import { CartContext } from "../../context/cart.context";

const Navigation = () =>{
  const { currentUser } = useContext(UserContext)
  const { cartClicked } = useContext(CartContext)
  
    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <CrwnLogo className="logo" />
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    Shop
                </Link>
                { currentUser ? <span className="nav-link" onClick={signOutUser}>Sign out</span> :
                <Link className="nav-link" to="/auth">
                    Sign-In
                </Link>
                }
                <CartIcon />
          </div>
          {cartClicked ? <CardDropdown /> : ""}
        </div>
      <Outlet />
      </Fragment>
    );
  }

  export default Navigation;