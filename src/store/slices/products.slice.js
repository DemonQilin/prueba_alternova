import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4} from 'uuid';

const productsSlice = createSlice({
    name: "products",
    initialState: null,
    reducers: {
        setProducts: (state, action) => action.payload,
    }
});

export const {setProducts} = productsSlice.actions;

export const loadProducts = () => async dispatch => {
    try {
        const products = await fetch('/data/products.json')
            .then(res => res.json())
            .then(res => res.products.map(product => {
                product.id = uuidv4();
                return product
            }));
        
        dispatch(setProducts(products));
    } catch (error) {
        console.log(error)
    }
}

export default productsSlice.reducer;