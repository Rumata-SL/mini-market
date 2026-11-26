import {createSelector} from '@reduxjs/toolkit';
import {BasketItem} from "@/entities/basket";
import {StateSchema} from "@/app/providers/StoreProvider";
import {selectAppliedPromo} from "@/entities/promo/model/selectors/promoSelector";


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

export const selectIsItemInBasket = createSelector(
    [
        (state: StateSchema) => state.basket.items,
        (_state: StateSchema, productId: number) => productId,
        (_state: StateSchema, _productId: number, colorId: number) => colorId,
        (_state: StateSchema, _productId: number, _colorId: number, size: number) => size,
    ],
    (items, productId, colorId, size) =>
        items.some(
            (i) => i.productId === productId && i.colorId === colorId && i.size === size
        )
);


export const selectBasketTotalWithDiscount = createSelector(
    [selectBasketTotalPrice, selectAppliedPromo],
    (totalPrice, promo) => {
        if (!promo) return totalPrice;

        if (promo.type === 'percent') {
            return totalPrice * (1 - promo.discount / 100);
        } else {
            if (promo.minOrder && totalPrice < promo.minOrder) {
                return totalPrice;
            }
            return Math.max(0, totalPrice - promo.discount);
        }
    }
);

export const selectBasketDiscount = createSelector(
    [selectBasketTotalPrice, selectBasketTotalWithDiscount],
    (totalPrice, totalPriceWithDiscount) => totalPrice - totalPriceWithDiscount
);