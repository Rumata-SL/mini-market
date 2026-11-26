import {AxiosInstance} from "axios";
import {NavigateOptions, To} from "react-router-dom";
import {ProductListSchema} from "@/widgets/ProductList/model/types/productListSchema";
import {CardProductSchema} from "@/pages/CardProduct/model/types/cardProductSchema";
import {BasketSchema} from "@/entities/basket/model/types/basketSchema";

export interface StateSchema {
    productList: ProductListSchema;
    cardProduct: CardProductSchema;
    basket: BasketSchema;

}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;

}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}