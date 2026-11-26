export type SizeName = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Size {
    id: number;
    name: SizeName;
    number: number;
}

export type CategoryName =
    | "Верхняя одежда"
    | "Нижняя одежда"
    | "Спорт"
    | "Аксессуары";

export interface Category {
    id: number;
    name: CategoryName;
}

export interface ProductColor {
    id: number;
    name: string;
    images: string[];
    price: string;
    description: string;
    sizes: Size['id'][];
}

export interface Product {
    id: number;
    name: string;
    categoryId: Category['id'];
    brand: string;
    colors: ProductColor[];
}

export type SortOrder = 'asc' | 'desc' | null;

export interface FiltersProducts {
    search: string;
    inStock: boolean;
    sortByPrice: SortOrder;
}

export interface ProductVariant {
    productId: number;
    productName: string;
    brand: string;
    categoryId: number;
    colorId: number;
    colorName: string;
    images: string[];
    price: string;
    description: string;
    sizes: number[];
}

export interface ProductListSchema {
    isLoading: boolean;
    error?: string;
    data: Product[];
    sizes: Size[]
}