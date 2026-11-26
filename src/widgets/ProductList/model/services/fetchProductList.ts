import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider/config/StateSchema";
import {getProducts} from "@/api/api";
import {Product} from "@/widgets/ProductList";

export const fetchProductList = createAsyncThunk<Product[], string | undefined, ThunkConfig<string>>(
    "productList/fetchProductList",
    async (_, thunkAPI) => {
        const {rejectWithValue} = thunkAPI;
        try {
            const response: Product[] = await getProducts();
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