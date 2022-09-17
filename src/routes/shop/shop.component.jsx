import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import { setCategories } from "../../store/categories/category.action"
import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss"

const Shop = () => {
 const categoriesMap = useSelector(selectCategoriesMap);
 const dispatch = useDispatch();

 useEffect(() => {
    const getCategoriesMap = async () =>{
    const categoriesArray = await getCategoriesAndDocuments('categories');
    console.log(categoriesArray);
    dispatch(setCategories(categoriesArray));
    };
  
    getCategoriesMap();
  }, [dispatch]);
 

    return (
    <Fragment>
    {
        Object.keys(categoriesMap).map((title) => (
            <Fragment key={title}>
                <h2>{title}</h2>
                <div className="products-container">
                    {categoriesMap[title].map((product) => (
                        <ProductCard key={product.id}  product={product}/>
                    ))}
                </div>
            </Fragment>
        ))}
    </Fragment>
    );
};

export default Shop;