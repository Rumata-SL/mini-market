import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import React, {ReactNode} from 'react';
import BasketIcon from '@/shared/assets/icons/BasketIcon.svg';
import {Link} from 'react-router-dom';
import {AppRouter, RoutePath} from '@/shared/config/routeConfig/routeConfig';
import {useAppSelector} from '@/app/providers/StoreProvider/config';
import {selectBasketTotalCount, selectBasketTotalPrice,} from '@/entities/basket/model/selectors/basketSelector';

export interface NavbarProps {
    className?: string;
    children?: ReactNode;
}

export const Navbar = (props: NavbarProps) => {
    const {className, children} = props;

    const totalCount = useAppSelector(selectBasketTotalCount);
    const totalPrice = useAppSelector(selectBasketTotalPrice);

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
                        <span className={cls.price}>{totalPrice.toFixed(2)} р</span>
                    </>
                )}
            </Link>
            {children}
        </div>
    );
};