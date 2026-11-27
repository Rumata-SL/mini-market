import {Link, useParams, useSearchParams} from 'react-router-dom';
import {ProductGallery} from './ProductGallery/ProductGallery';
import {ProductInfo} from './ProductInfo/ProductInfo';
import React, {useEffect, useRef, useState} from 'react';
import cls from './CardProduct.module.scss';
import {useAppDispatch, useAppSelector} from '@/app/providers/StoreProvider/config';
import {AppRouter, RoutePath} from '@/shared/config/routeConfig/routeConfig';
import {cardProductSelector} from '../model/selectors/cardProductSelector';
import {fetchProductById} from '@/pages/CardProduct';
import {ProductPurchasePanel} from '../ui/ProductPurchasePanel/ProductPurchasePanel';
import {Loader} from "@/shared/ui/Loader";
import {ProductColor} from "@/widgets/ProductList";

export const CardProduct = () => {
    const {id} = useParams<{ id: string }>();
    const productId = Number(id);

    const dispatch = useAppDispatch();
    const {product, isLoading, error} = useAppSelector(cardProductSelector);

    const [searchParams, setSearchParams] = useSearchParams();
    const [colorIndex, setColorIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    const prevProductIdRef = useRef(productId);
    const isUpdatingUrlRef = useRef(false);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (!product) return;

        const isProductIdChanged = prevProductIdRef.current !== productId;
        prevProductIdRef.current = productId;

        if (isProductIdChanged || !isUpdatingUrlRef.current) {
            const colorIdFromUrl = searchParams.get('color');
            const sizeFromUrl = searchParams.get('size');

            const initialColorIndex = colorIdFromUrl
                ? product.colors.findIndex((c: ProductColor) => c.id === Number(colorIdFromUrl))
                : 0;

            setColorIndex(initialColorIndex >= 0 ? initialColorIndex : 0);
            setSelectedSize(sizeFromUrl ? Number(sizeFromUrl) : null);
        }

        isUpdatingUrlRef.current = false;
    }, [product, productId, searchParams]);

    useEffect(() => {
        if (!product) return;

        const currentColorId = product.colors[colorIndex]?.id;
        const params: Record<string, string> = {};

        if (currentColorId) {
            params.color = String(currentColorId);
        }
        if (selectedSize !== null) {
            params.size = String(selectedSize);
        }

        isUpdatingUrlRef.current = true;
        setSearchParams(params, {replace: true});
    }, [colorIndex, selectedSize, product, setSearchParams]);

    if (isLoading) {
        return <div className={cls.load}><Loader/></div>;
    }

    if (error || !product) {
        return (
            <div className={cls.notFound}>
                <h2>Товар не найден</h2>
                <Link to={RoutePath[AppRouter.CATALOG_PAGE]} className={cls.backLink}>
                    ← Вернуться в каталог
                </Link>
            </div>
        );
    }

    const selectedColor = product.colors[colorIndex];

    return (
        <div className={cls.page}>
            <nav className={cls.breadcrumbs}>
                <Link to={RoutePath[AppRouter.CATALOG_PAGE]}>← Вернуться в каталог</Link>
                <span>/</span>
                <span>{product.name}</span>
            </nav>

            <div className={cls.content}>
                <ProductGallery
                    color={selectedColor}
                    productName={product.name}
                />
                <ProductInfo
                    product={product}
                    colorIndex={colorIndex}
                    onColorChange={(i) => {
                        setColorIndex(i);
                        setSelectedSize(null);
                    }}
                    selectedSize={selectedSize}
                    onSizeChange={setSelectedSize}
                />
                <ProductPurchasePanel/>
            </div>
        </div>
    );
};