import {StateSchema} from "@/app/providers/StoreProvider";

export const sizesSelector = (state: StateSchema) => state.productList.sizes;