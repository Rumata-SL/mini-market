import {BasketItem, BasketSchema} from "@/entities/basket";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: BasketSchema = {items: []};

const findItemIndex = (items: BasketItem[], productId: number, colorId: number, size: number) =>
    items.findIndex((i) => i.productId === productId && i.colorId === colorId && i.size === size);

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Omit<BasketItem, 'quantity'>>) => {
            const {productId, colorId, size} = action.payload;
            const idx = findItemIndex(state.items, productId, colorId, size);
            if (idx >= 0) {
                state.items[idx].quantity += 1;
            } else {
                state.items.push({productId, colorId, size, quantity: 1});
            }
        },

        setQuantity: (
            state,
            action: PayloadAction<{ productId: number; colorId: number; size: number; quantity: number }>
        ) => {
            const {productId, colorId, size, quantity} = action.payload;
            const idx = findItemIndex(state.items, productId, colorId, size);
            if (idx >= 0) {
                state.items[idx].quantity = Math.max(1, quantity);
            }
        },

        removeFromCart: (
            state,
            action: PayloadAction<{ productId: number; colorId: number; size: number }>
        ) => {
            const {productId, colorId, size} = action.payload;
            state.items = state.items.filter(
                (i) => !(i.productId === productId && i.colorId === colorId && i.size === size)
            );
        },

        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {addToCart} = basketSlice.actions;

export const {actions: basketActions} = basketSlice;
export const {reducer: basketReducer} = basketSlice;