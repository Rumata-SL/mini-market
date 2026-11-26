import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CardProductSchema} from "@/pages/CardProduct/model/types/cardProductSchema";
import {fetchProductList} from "@/widgets/ProductList/model/services/fetchProductList";
import {Product} from "@/api/types";
import {fetchProductById} from "@/pages/CardProduct/model/services/fetchProductById";


const initialState: CardProductSchema = {
    isLoading: false,
    error: "",
    product: undefined,
};

export const cardProductSlice = createSlice({
    name: 'cardProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
                state.isLoading = false;
                state.product = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});


export const {actions: cardProductActions} = cardProductSlice;
export const {reducer: cardProductReducer} = cardProductSlice;