import {FiltersProducts, ProductVariant, SortOrder} from "@/widgets/ProductList/model/types/productListSchema";

export const filterBySearch = (
    variants: ProductVariant[],
    query: string
): ProductVariant[] => {
    if (!query.trim()) return variants;

    const lowerQuery = query.toLowerCase().trim();
    return variants.filter((v) =>
        v.productName.toLowerCase().includes(lowerQuery)
    );
};

export const filterByStock = (
    variants: ProductVariant[],
    isInStockOnly: boolean
): ProductVariant[] => {
    if (!isInStockOnly) return variants;

    return variants.filter((v) => v.sizes.length > 0);
};

export const sortByPrice = (
    variants: ProductVariant[],
    order: SortOrder
): ProductVariant[] => {
    if (!order) return variants;

    return [...variants].sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
};

export const applyFilters = (
    variants: ProductVariant[],
    filters: FiltersProducts
): ProductVariant[] => {
    let result = variants;

    result = filterBySearch(result, filters.search);
    result = filterByStock(result, filters.inStock);
    result = sortByPrice(result, filters.sortByPrice);

    return result;
};