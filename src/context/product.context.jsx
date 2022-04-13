
import { createContext, useState } from "react";
import SHOP_DATA from "../shop-data.json"

export const ProductContext = createContext({
    currentProducts: []
})

export const ProductProvider = ({children}) => {
    const [currentProducts, setCurrentProducts] = useState(SHOP_DATA);
    const value = {currentProducts, setCurrentProducts};



    return <ProductContext.Provider value={value}> {children} </ProductContext.Provider>
}