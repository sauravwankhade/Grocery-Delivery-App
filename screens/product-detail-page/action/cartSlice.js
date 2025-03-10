import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    value: true,
    address: null,
};

const cartSlice = createSlice({
    name: 'shoping_card',
    initialState,
    reducers: {
        addToCart: (state, { payload }) => {
            state.items.push(payload)
        },
        incrementQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.items.find((item) => item.cartId === productId);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.items.find((item) => item.cartId === productId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else if (item && item.quantity === 1) {
                state.items = state.items.filter((item) => item.cartId !== productId);
            }
        },
        removeItemFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(item => item.cartId !== productId);
        },
        saveAddress: (state, action) => {
            state.address = action.payload;
        },
    },
});

export const { addToCart, updateItemQuantity, removeItemFromCart, incrementQuantity, decrementQuantity, saveAddress } = cartSlice.actions;

export default cartSlice.reducer;