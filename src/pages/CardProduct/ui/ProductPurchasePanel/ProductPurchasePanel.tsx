import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './ProductPurchasePanel.module.scss';

interface ProductPurchasePanelProps {
    className?: string;
}

export const ProductPurchasePanel = ({className,}: ProductPurchasePanelProps) => {


    return (
        <aside className={classNames(cls.panel, {}, [className])}>
            ProductPurchasePanel
        </aside>
    );
};