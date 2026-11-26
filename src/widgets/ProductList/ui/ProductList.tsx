import React, {ReactNode, useMemo, useState} from 'react';
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./ProductList.module.scss"
import {ProductCard} from "@/entities/product";
import {useAppSelector} from "@/app/providers/StoreProvider/config";
import {getProductList, selectProductVariants} from "@/widgets/ProductList/model/selectors/productListSelectors";
import {ProductFilters} from "@/widgets/ProductList/ui/ProductFilters";
import {FiltersProducts} from "@/widgets/ProductList/model/types/productListSchema";
import {applyFilters} from "@/widgets/ProductList/lib/filterProducts";
import {ErrorPage} from "@/widgets/ErrorPage";
import {Loader} from "@/shared/ui/Loader";

export interface ProductListProps {
    className?: string;
    children?: ReactNode;
}

const initialFilters: FiltersProducts = {
    search: '',
    inStock: false,
    sortByPrice: null,
};

export const ProductList = (props: ProductListProps) => {
    const {className} = props;
    const {isLoading, error} = useAppSelector(getProductList);
    const flatList = useAppSelector(selectProductVariants);
    const [filters, setFilters] = useState<FiltersProducts>(initialFilters);

    const filteredProducts = useMemo(() => {
        return applyFilters(flatList, filters)
    }, [flatList, filters]);

    const productList = useMemo(() => filteredProducts.map((product, index) => {
        const key = `${product.productId}${product.productName}${product.sizes}${index}`
        return (
            <ProductCard
                key={key}
                product={product}
            />
        )
    }), [filteredProducts])


    if (isLoading) {
        return <div className={cls.loader}><Loader/></div>;
    }

    if (error || !flatList) {
        return (
            <ErrorPage/>
        );
    }

    return (
        <div className={classNames(cls.product, {}, [className])}>
            <ProductFilters filters={filters} onChange={setFilters}/>
            <div className={classNames(cls.list, {}, [className])}>
                {!filteredProducts.length ? (<p className={cls.empty}>Товары не найдены</p>) : (productList)}
            </div>
        </div>
    );
};
