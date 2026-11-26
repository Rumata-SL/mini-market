export interface BasketItem {
    productId: number;
    colorId: number;
    size: number;
    quantity: number;
}

export interface BasketSchema {
    items: BasketItem[];
}