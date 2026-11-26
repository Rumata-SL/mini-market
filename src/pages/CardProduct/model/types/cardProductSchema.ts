import {Product} from "@/widgets/ProductList/model/types/productListSchema";

export interface CardProductSchema {
    isLoading: boolean;
    error?: string;
    product?: Product;
}