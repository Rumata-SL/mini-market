import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider/config/StateSchema";
import {getProduct} from "@/api/api";
import {Product} from "@/widgets/ProductList/model/types/productListSchema";

export const fetchProductById = createAsyncThunk<Product, string | undefined, ThunkConfig<string>>(
    "cardProduct/fetchProductById",
    async (productId, thunkAPI) => {
        const {rejectWithValue} = thunkAPI;
        if (!productId) {
            return rejectWithValue("error");
        }
        try {
            const response: Product = await getProduct(productId);
            if (!response) {
                throw new Error();
            }
            return response;

        } catch (e) {
            console.log(e);
            return rejectWithValue("Произошла непредвиденная ошибка");
        }

    },
);