import {classNames} from '@/shared/lib/classNames/classNames';
import type {FiltersProducts, SortOrder} from '../model/types/productListSchema';
import cls from './ProductFilters.module.scss';
import {ChangeEvent} from "react";
import ChevronDownIcon from '@/shared/assets/icons/chevron-down.svg';

interface ProductFiltersProps {
    filters: FiltersProducts;
    onChange: (filters: FiltersProducts) => void;
    className?: string;
}

export const ProductFilters = ({filters, onChange, className}: ProductFiltersProps) => {

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        onChange({...filters, search: e.target.value});
    };

    const handleClearSearch = () => {
        onChange({...filters, search: ''});
    };

    const handleInStock = (e: ChangeEvent<HTMLInputElement>) => {
        onChange({...filters, inStock: e.target.checked});
    };

    const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as SortOrder;
        onChange({...filters, sortByPrice: value || null});
    };

    return (
        <div className={classNames(cls.filters, {}, [className])}>
            <div className={cls.searchWrapper}>
                <input
                    type="text"
                    placeholder="Поиск по названию..."
                    value={filters.search}
                    onChange={handleSearch}
                    className={cls.search}
                />
                {filters.search && (
                    <button
                        type="button"
                        className={cls.clearBtn}
                        onClick={handleClearSearch}
                        aria-label="Очистить поиск"
                    >
                        ×
                    </button>
                )}
            </div>

            <label className={cls.checkbox}>
                <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={handleInStock}
                />
                <span>В наличии</span>
            </label>

            <div className={cls.selectWrapper}><select
                value={filters.sortByPrice ?? ''}
                onChange={handleSort}
                className={cls.sort}
            >
                <option value="">Без сортировки</option>
                <option value="asc">Сначала дешёвые</option>
                <option value="desc">Сначала дорогие</option>
            </select>
                <ChevronDownIcon
                    className={cls.arrow}
                    width={16}
                    height={16}
                /></div>
        </div>
    );
};