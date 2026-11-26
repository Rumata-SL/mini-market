import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider/config/StateSchema";
import {getSizes} from "@/api/api";
import {Size} from "@/widgets/ProductList";

export const fetchSizesList = createAsyncThunk<Size[], string | undefined, ThunkConfig<string>>(
    "productList/fetchSizesList",
    async (_, thunkAPI) => {
        const {rejectWithValue} = thunkAPI;
        try {
            const response: Size[] = await getSizes();
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