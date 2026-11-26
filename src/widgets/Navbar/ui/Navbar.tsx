import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import React, {ReactNode} from 'react';
import BasketIcon from '@/shared/assets/icons/BasketIcon.svg';
import {Link} from 'react-router-dom';
import {AppRouter, RoutePath} from '@/shared/config/routeConfig/routeConfig';
import {useAppSelector} from '@/app/providers/StoreProvider/config';
import {selectBasketTotalCount, selectBasketTotalWithDiscount,} from '@/entities/basket/model/selectors/basketSelector';

export interface NavbarProps {
    className?: string;
    children?: ReactNode;
}

export const Navbar = (props: NavbarProps) => {
    const {className, children} = props;

    const totalCount = useAppSelector(selectBasketTotalCount);
    const totalPriceWithDiscount = useAppSelector(selectBasketTotalWithDiscount);


    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <Link
                to={RoutePath[AppRouter.BASKET]}
                className={cls.basketLink}
            >
                <BasketIcon
                    className={cls.icon}
                    width={40}
                    height={40}
                />
                {totalCount > 0 && (
                    <>
                        <span className={cls.count}>{totalCount}</span>
                        <div className={cls.priceBlock}>
                            <span className={cls.price}>
                                {totalPriceWithDiscount.toFixed(2)} ₽
                            </span>
                        </div>
                    </>
                )}
            </Link>
            {children}
        </div>
    );
};