import {Product, ProductVariant} from "@/widgets/ProductList";

export const flattenProducts = (products: Product[]): ProductVariant[] => {
    return products.flatMap((product) =>
        product.colors.map((color) => ({
            productId: product.id,
            productName: product.name,
            brand: product.brand,
            categoryId: product.categoryId,
            colorId: color.id,
            colorName: color.name,
            images: color.images,
            price: color.price,
            description: color.description,
            sizes: color.sizes,
        }))
    );
};

