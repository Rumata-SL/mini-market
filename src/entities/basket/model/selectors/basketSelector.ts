import {createSelector} from '@reduxjs/toolkit';
import {BasketItem} from "@/entities/basket";
import {StateSchema} from "@/app/providers/StoreProvider";


const selectBasketItems = (state: StateSchema) => state.basket.items;

const selectProducts = (state: StateSchema) => state.productList.data;


export interface BasketItemWithProduct extends BasketItem {
    productName: string;
    brand: string;
    colorName: string;
    colorImage: string;
    price: number;
}

export const selectBasketEnrichedItems = createSelector(
    [selectBasketItems, selectProducts],
    (items, products): BasketItemWithProduct[] => {
        return items
            .map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;
                const color = product.colors.find((c) => c.id === item.colorId);
                if (!color) return null;
                return {
                    ...item,
                    productName: product.name,
                    brand: product.brand,
                    colorName: color.name,
                    colorImage: color.images[0] ?? '',
                    price: parseFloat(color.price),
                };
            })
            .filter((x): x is BasketItemWithProduct => x !== null);
    }
);

export const selectBasketTotalCount = createSelector(
    [selectBasketItems],
    (items) => items.reduce((sum, i) => sum + i.quantity, 0)
);

export const selectBasketTotalPrice = createSelector(
    [selectBasketEnrichedItems],
    (items) => items.reduce((sum, i) => sum + i.price * i.quantity, 0)
);

export const selectIsItemInBasket = (
    state: StateSchema,
    productId: number,
    colorId: number,
    size: number
): boolean => {
    return state.basket.items.some(
        (i) => i.productId === productId && i.colorId === colorId && i.size === size
    );
};