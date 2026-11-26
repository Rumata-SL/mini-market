import {Product} from "@/widgets/ProductList";


export const getAllSizes = (product: Product): number[] => {
    const set = new Set<number>();
    product.colors.forEach((color) => color.sizes.forEach((s) => set.add(s)));
    return [...set].sort((a, b) => a - b);
};

export const getAvailableSizesForColor = (product: Product, colorId: number): number[] => {
    const color = product.colors.find((c) => c.id === colorId);
    return color ? color.sizes : [];
};