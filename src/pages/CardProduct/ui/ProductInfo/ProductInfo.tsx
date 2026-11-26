import {useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {addToCart} from '@/entities/basket';
import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './ProductInfo.module.scss';
import {selectIsItemInBasket} from '@/entities/basket/model/selectors/basketSelector';
import {AppRouter, RoutePath} from '@/shared/config/routeConfig/routeConfig';
import {Product, resolveSizes, sizesSelector} from "@/widgets/ProductList";
import {StateSchema, useAppDispatch, useAppSelector} from "@/app/providers/StoreProvider";

interface ProductInfoProps {
    product: Product;
    colorIndex: number;
    onColorChange: (index: number) => void;
    selectedSize: number | null;
    onSizeChange: (size: number | null) => void;
    className?: string;
}

export const ProductInfo = (props: ProductInfoProps) => {
    const {product, colorIndex, onColorChange, selectedSize, onSizeChange, className} = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const sizes = useAppSelector(sizesSelector);


    const selectedColor = product.colors[colorIndex];

    const allSizes = useMemo(() => {
        const allIds = product.colors.flatMap((c) => c.sizes);
        return resolveSizes(allIds, sizes);
    }, [product, sizes]);

    const availableSizes = useMemo(() => {
        return resolveSizes(selectedColor.sizes, sizes);
    }, [selectedColor, sizes]);

    const isInBasket = useAppSelector((state: StateSchema) =>
        selectedSize !== null
            ? selectIsItemInBasket(state, product.id, selectedColor.id, selectedSize)
            : false
    );

    useEffect(() => {
        if (selectedSize !== null && !availableSizes.some((s) => s.id === selectedSize)) {
            onSizeChange(null);
        }
    }, [availableSizes, selectedSize, onSizeChange]);

    const addBasket = () => {
        if (isInBasket) {
            navigate(RoutePath[AppRouter.BASKET]);
        } else if (selectedSize !== null) {
            dispatch(
                addToCart({
                    productId: product.id,
                    colorId: selectedColor.id,
                    size: selectedSize,
                })
            );
        }
    };

    const canAdd = selectedSize !== null && availableSizes.length > 0;

    let buttonText: string;
    let buttonMode: 'add' | 'go';

    if (availableSizes.length === 0) {
        buttonText = 'Нет в наличии';
        buttonMode = 'add';
    } else if (selectedSize === null) {
        buttonText = 'Выберите размер';
        buttonMode = 'add';
    } else if (isInBasket) {
        buttonText = 'Корзина';
        buttonMode = 'go';
    } else {
        buttonText = 'В корзину';
        buttonMode = 'add';
    }

    return (
        <div className={classNames(cls.info, {}, [className])}>
            <span className={cls.brand}>{product.brand}</span>
            <h1 className={cls.name}>{product.name}</h1>

            <div className={cls.price}>{parseFloat(selectedColor.price).toFixed(2)} ₽</div>

            <div className={cls.section}>
                <span className={cls.label}>Цвет: <b>{selectedColor.name}</b></span>
            </div>

            <div className={cls.colorThumbs}>
                {product.colors.map((color, index) => (
                    <button
                        key={color.id}
                        type="button"
                        className={classNames(cls.colorThumb, {
                            [cls.colorThumbActive]: index === colorIndex,
                        })}
                        onClick={() => {
                            onColorChange(index);
                            onSizeChange(null);
                        }}
                        aria-label={`Цвет: ${color.name}`}
                    >
                        {color.images[0] && <img src={color.images[0]} alt={color.name}/>}
                    </button>
                ))}
            </div>

            <div className={cls.section}>
                <span className={cls.label}>Размер</span>
                <div className={cls.sizeOptions}>
                    {allSizes.map((size) => {
                        const isAvailable = availableSizes.some((s) => s.id === size.id);
                        return (
                            <button
                                key={size.id}
                                type="button"
                                disabled={!isAvailable}
                                className={classNames(cls.sizeOption, {
                                    [cls.sizeActive]: selectedSize === size.id,
                                    [cls.sizeDisabled]: !isAvailable,
                                })}
                                onClick={() => onSizeChange(size.id)}
                                title={`${size.name} (${size.number})`}
                            >
                                {size.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            <span className={cls.label}>
                <b>
                    {`${selectedColor.name}  ${
                        selectedSize
                            ? '/ ' + (availableSizes.find((s) => s.id === selectedSize)?.name ?? selectedSize)
                            : ''
                    }`}
                </b>
            </span>
            <div className={cls.section}>
                <span className={cls.label}>
                    Описание: <b>{selectedColor.description}</b>
                </span>
            </div>

            <button
                type="button"
                className={classNames(cls.addToCart, {
                    [cls.addToCartGo]: buttonMode === 'go',
                })}
                onClick={addBasket}
                disabled={!canAdd && !isInBasket}
            >
                {buttonMode === 'go' && (
                    <svg
                        className={cls.arrowIcon}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                )}
                {buttonText}
            </button>
        </div>
    );
};