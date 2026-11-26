import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider/config/StateSchema";
import {Product} from "@/widgets/ProductList";
import {getProducts} from "@/api/api";

export const fetchProductList = createAsyncThunk<Product[], string | undefined, ThunkConfig<string>>(
    "productList/fetchProductList",
    async (_, thunkAPI) => {
        const {rejectWithValue} = thunkAPI;
        try {
            const response: Product[] = await getProducts();
            // const response = null;
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