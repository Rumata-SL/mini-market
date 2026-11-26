import React, {useState} from "react";
import {Link} from 'react-router-dom';

import cls from './Basket.module.scss';

import {AppRouter, RoutePath} from "@/shared/config/routeConfig/routeConfig";
import {pluralizeItems} from "@/entities/basket/model/lib/pluralizeItems";
import {getProductList} from "@/widgets/ProductList/model/selectors/productListSelectors";
import {
    basketActions,
    selectBasketEnrichedItems,
    selectBasketTotalCount,
    selectBasketTotalPrice,
} from "@/entities/basket";
import {useAppDispatch, useAppSelector} from "@/app/providers/StoreProvider";
import {sizesSelector} from "@/widgets/ProductList";
import {ErrorPage} from "@/widgets/ErrorPage";
import {Loader} from "@/shared/ui/Loader";
import {selectBasketDiscount, selectBasketTotalWithDiscount} from "@/entities/basket/model/selectors/basketSelector";
import {selectAppliedPromo, selectPromoError} from "@/entities/promo/model/selectors/promoSelector";
import {promoAction} from "@/entities/promo/model/slice/promoSlice";

export const Basket = () => {
    const dispatch = useAppDispatch();
    const {isLoading, error} = useAppSelector(getProductList);
    const items = useAppSelector(selectBasketEnrichedItems);
    const totalCount = useAppSelector(selectBasketTotalCount);
    const totalPrice = useAppSelector(selectBasketTotalPrice);
    const totalPriceWithDiscount = useAppSelector(selectBasketTotalWithDiscount);
    const discount = useAppSelector(selectBasketDiscount);
    const appliedPromo = useAppSelector(selectAppliedPromo);
    const promoError = useAppSelector(selectPromoError);
    const sizes = useAppSelector(sizesSelector);

    const [promoInput, setPromoInput] = useState('');

    const getSizeName = (id: number) => sizes.find((s) => s.id === id)?.name ?? String(id);

    const handleDecrement = (item: (typeof items)[number]) => {
        if (item.quantity <= 1) {
            dispatch(basketActions.removeFromCart({
                productId: item.productId,
                colorId: item.colorId,
                size: item.size,
            }));
        } else {
            dispatch(basketActions.setQuantity({
                productId: item.productId,
                colorId: item.colorId,
                size: item.size,
                quantity: item.quantity - 1,
            }));
        }
    };

    const handleIncrement = (item: (typeof items)[number]) => {
        dispatch(basketActions.setQuantity({
            productId: item.productId,
            colorId: item.colorId,
            size: item.size,
            quantity: item.quantity + 1,
        }));
    };

    const handleRemove = (item: (typeof items)[number]) => {
        dispatch(basketActions.removeFromCart({
            productId: item.productId,
            colorId: item.colorId,
            size: item.size,
        }));
    };

    const handleApplyPromo = () => {
        if (promoInput.trim()) {
            dispatch(promoAction.applyPromo(promoInput));
        }
    };

    const handleRemovePromo = () => {
        dispatch(promoAction.removePromo());
        setPromoInput('');
    };

    const handlePromoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPromoInput(e.target.value);
        if (promoError) {
            dispatch(promoAction.clearError());
        }
    };

    const handlePromoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleApplyPromo();
        }
    };

    if (isLoading) {
        return <div className={cls.load}><Loader/></div>;
    }
    if (error) {
        return <ErrorPage>Ошибка: {error}</ErrorPage>;
    }

    if (items.length === 0) {
        return (
            <div className={cls.empty}>
                <h1 className={cls.emptyTitle}>Корзина</h1>
                <p className={cls.emptyText}>Здесь пока пусто</p>
                <Link to={RoutePath[AppRouter.CATALOG_PAGE]} className={cls.emptyLink}>
                    Перейти в каталог
                </Link>
            </div>
        );
    }

    return (
        <div className={cls.page}>
            <nav className={cls.pat}>
                <Link to={RoutePath[AppRouter.CATALOG_PAGE]}>← Вернуться в каталог</Link>
                <span>/</span>
                <span>корзина</span>
            </nav>
            <header className={cls.header}>
                <h1 className={cls.title}>Корзина</h1>
                <div className={cls.headerRight}>
                    <span className={cls.itemsCount}>{totalCount} {pluralizeItems(totalCount)}</span>
                    <button
                        type="button"
                        className={cls.clearLink}
                        onClick={() => dispatch(basketActions.clearCart())}
                    >
                        Удалить все
                    </button>
                </div>
            </header>

            <div className={cls.layout}>
                <div className={cls.list}>
                    {items.map((item) => {
                        const productLink = `${RoutePath[AppRouter.CARD_PRODUCT_DETAILS]}${item.productId}?color=${item.colorId}&size=${item.size}`;

                        return (
                            <article key={`${item.productId}-${item.colorId}-${item.size}`} className={cls.card}>
                                <Link to={productLink} className={cls.cardImage}>
                                    {item.colorImage && (
                                        <img
                                            src={item.colorImage}
                                            alt={`${item.productName} ${item.colorName}`}
                                        />
                                    )}
                                </Link>

                                <div className={cls.cardInfo}>
                                    <Link to={productLink} className={cls.cardName}>
                                        {item.productName}
                                    </Link>

                                    <div className={cls.cardMeta}>
                                        Цвет: {item.colorName} · Размер: {getSizeName(item.size)}
                                    </div>
                                    <div className={cls.cardQuantity}>
                                        {item.quantity} шт.
                                    </div>
                                    <div className={cls.cardPrice}>
                                        <span className={cls.priceCurrent}>
                                            {(item.price * item.quantity).toFixed(2)} ₽
                                        </span>
                                        <span className={cls.priceTotal}>
                                            {item.price.toFixed(2)} ₽ × {item.quantity} = {(item.price * item.quantity).toFixed(2)} ₽
                                        </span>
                                    </div>
                                </div>

                                <div className={cls.cardControls}>
                                    <div className={cls.quantity}>
                                        <button
                                            type="button"
                                            className={cls.qtyBtn}
                                            onClick={() => handleDecrement(item)}
                                            aria-label="Уменьшить"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M5 12h14" stroke="currentColor" strokeWidth="2"
                                                      strokeLinecap="round"/>
                                            </svg>
                                        </button>
                                        <span className={cls.qtyValue}>{item.quantity}</span>
                                        <button
                                            type="button"
                                            className={cls.qtyBtn}
                                            onClick={() => handleIncrement(item)}
                                            aria-label="Увеличить"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2"
                                                      strokeLinecap="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        className={cls.removeBtn}
                                        onClick={() => handleRemove(item)}
                                        aria-label="Удалить"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <aside className={cls.sidebar}>
                    <Link
                        to={RoutePath[AppRouter.CATALOG_PAGE]}
                        className={cls.checkoutBtn}
                    >
                        Перейти к оформлению
                    </Link>

                    <div className={cls.summary}>
                        {/* Поле промокода */}
                        <div className={cls.promoSection}>
                            {appliedPromo ? (
                                <div className={cls.promoApplied}>
                                    <div className={cls.promoInfo}>
                                        <span className={cls.promoCode}>{appliedPromo.code}</span>
                                        <span className={cls.promoDiscount}>
                                            {appliedPromo.type === 'percent'
                                                ? `-${appliedPromo.discount}%`
                                                : `-${appliedPromo.discount} ₽`}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        className={cls.promoRemove}
                                        onClick={handleRemovePromo}
                                        aria-label="Удалить промокод"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            ) : (
                                <div className={cls.promoInput}>
                                    <input
                                        type="text"
                                        placeholder="Промокод"
                                        value={promoInput}
                                        onChange={handlePromoInputChange}
                                        onKeyDown={handlePromoKeyDown}
                                        className={cls.promoField}
                                    />
                                    <button
                                        type="button"
                                        className={cls.promoApplyBtn}
                                        onClick={handleApplyPromo}
                                        disabled={!promoInput.trim()}
                                    >
                                        Применить
                                    </button>
                                </div>
                            )}
                            {promoError && <div className={cls.promoError}>{promoError}</div>}
                        </div>

                        <div className={cls.summaryRow}>
                            <span>{totalCount} {pluralizeItems(totalCount)}</span>
                            <span className={cls.summaryValue}>{totalPrice.toFixed(2)} ₽</span>
                        </div>

                        {/* Скидка */}
                        {discount > 0 && (
                            <div className={cls.summaryRow}>
                                <span className={cls.discountLabel}>Скидка</span>
                                <span className={cls.discountValue}>-{discount.toFixed(2)} ₽</span>
                            </div>
                        )}

                        <div className={cls.summaryDivider}/>

                        <div className={cls.summaryTotal}>
                            <span className={cls.summaryTotalLabel}>Итого</span>
                            <span className={cls.summaryTotalValue}>
                                {totalPriceWithDiscount.toFixed(2)} ₽
                            </span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};