import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addArticle: (state, action) => {
            const cart = JSON.parse(JSON.stringify(state));
            cart.push(action.payload);
            return cart;
        },
        updateArticle: (state, action) => {
            const cart = JSON.parse(JSON.stringify(state));
            const index = cart.findIndex(product => product.id === action.payload.id);

            cart[index] = {
                id: cart[index].id,
                name: cart[index].name,
                price: cart[index].price,
                quanty: action.payload.quanty
            };
            return cart;
        },
        deleteArticle: (state, action) => {
            const cart = JSON.parse(JSON.stringify(state));
            const index = cart.findIndex(product => product.id === action.payload.id);

            cart.splice(index, 1);
            return cart;
        },
        resetCart: () => [],
    },
});

export const { addArticle, updateArticle, deleteArticle, resetCart} = cartSlice.actions;

export default cartSlice.reducer