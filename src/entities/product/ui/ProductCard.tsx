import {memo, useMemo} from "react";
import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './ProductCard.module.scss';
import {Link} from "react-router-dom";
import {AppRouter, RoutePath} from "@/shared/config/routeConfig/routeConfig";
import {ProductVariant, resolveSizes, sizesSelector} from "@/widgets/ProductList";
import {useAppSelector} from "@/app/providers/StoreProvider";

interface ProductCardProps {
    product: ProductVariant;
    className?: string;
}

export const ProductCard = memo(({product, className}: ProductCardProps) => {
    const {productId, productName, colorName, brand, price, images, description, sizes, colorId} = product;
    const sizeList = useAppSelector(sizesSelector);

    const previewImage = images[0] || '';

    const nameNumberSize = useMemo(() => {
        return resolveSizes(sizes, sizeList).map(el => `${el.name}`);
    }, [sizeList, sizes])

    return (
        <Link
            to={`${RoutePath[AppRouter.CARD_PRODUCT_DETAILS]}${productId}?color=${colorId}`}
            className={cls.cardLink}
        >
            <article className={classNames(cls.card, {}, [className])}>
                <div className={cls.imageWrapper}>
                    <img
                        src={previewImage}
                        alt={`${productName} ${colorName}`}
                        className={cls.image}
                    />
                </div>
                <div className={cls.info}>
                    <span className={cls.brand}>{brand}</span>
                    <h3 className={cls.name}>{productName}</h3>
                    <span className={cls.color}>Цвет: {colorName}</span>
                    <p className={cls.description}>{description}</p>
                    <div className={cls.footer}>
                        <span className={cls.price}>{price} ₽</span>
                        {sizes.length > 0 && (
                            <span className={cls.sizes}>
                                Разм.: {nameNumberSize.join(', ')}
                            </span>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
});

ProductCard.displayName = 'ProductCard';