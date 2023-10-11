import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    cartItems: [],
    amount: 2,
    total: 0,
    isLoading: true
}
const url = 'https://course-api.com/react-useReducer-cart-project';
export const getCartItems = createAsyncThunk('cart/getCartItems', async (name, thunkAPI) => {
    try {
        console.log(thunkAPI);
        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue("something went Wrong!!!");
    }
})
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
        },
        removeItems: (state, actions) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== actions.payload);

        },
        incrementItem: (state, { payload }) => {

            const cartItem = state.cartItems.find((item) => item.id === payload);
            cartItem.amount = cartItem.amount + 1;
        },
        decrementItem: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload);
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            })
            state.amount = amount;
            state.total = total.toFixed(2);
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getCartItems.pending, (state) => state.isLoading = true)
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.isLoading = false;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            })

    }


});
export const { clearCart, removeItems, incrementItem, decrementItem, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;