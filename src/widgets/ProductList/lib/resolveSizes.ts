import {Size} from "@/widgets/ProductList";

export const resolveSizes = (ids: number[], sizes: Size[]): Size[] => {
    const idSet = new Set(ids);
    return sizes.filter((s) => idSet.has(s.id));
};