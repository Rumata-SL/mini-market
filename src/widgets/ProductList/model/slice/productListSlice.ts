import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchProductList, fetchSizesList, Product, ProductListSchema, Size} from "@/widgets/ProductList";

const initialState: ProductListSchema = {
    isLoading: false,
    error: "",
    data: [],
    sizes: [],
};

export const productListSlice = createSlice({
    name: 'productList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductList.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchProductList.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchProductList.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchSizesList.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchSizesList.fulfilled, (state, action: PayloadAction<Size[]>) => {
                state.isLoading = false;
                state.sizes = action.payload;
            })
            .addCase(fetchSizesList.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});


export const {actions: productListActions} = productListSlice;
export const {reducer: productListReducer} = productListSlice;