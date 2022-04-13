import { useContext } from "react";
import { ProductContext } from "../../context/product.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss"
const Shop = () => {
 const  {currentProducts}  = useContext(ProductContext);
 

    return (
    <div className="products-container">
        {currentProducts.map((product) => (
            <ProductCard key={product.id}  product={product}/>
        ))}
    </div>
    );
}

export default Shop;