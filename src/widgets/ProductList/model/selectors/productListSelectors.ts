import {StateSchema} from "@/app/providers/StoreProvider/config/StateSchema";
import {flattenProducts} from "@/widgets/ProductList/lib/flattenProducts";
import {createSelector} from "@reduxjs/toolkit";

export const productListSelector = (state: StateSchema) => state.productList;

const selectProducts = (state: StateSchema) => state.productList.data;

export const selectProductVariants = createSelector(
    [selectProducts],
    (products) => flattenProducts(products)
);
