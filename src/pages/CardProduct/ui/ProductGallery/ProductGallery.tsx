import {useEffect, useState} from 'react';
import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './ProductGallery.module.scss';
import {ProductColor} from "@/widgets/ProductList";

interface ProductGalleryProps {
    color: ProductColor;
    productName: string;
    className?: string;
}

export const ProductGallery = ({color, productName, className}: ProductGalleryProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setActiveIndex(0);
    }, [color.id]);

    const images = color.images;

    if (images.length === 0) {
        return <div className={cls.noImage}>Нет изображений</div>;
    }

    return (
        <div className={classNames(cls.gallery, {}, [className])}>

            <div className={cls.thumbs}>
                {images.map((img, index) => (
                    <button
                        key={img}
                        type="button"
                        className={classNames(cls.thumb, {[cls.thumbActive]: index === activeIndex})}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Изображение ${index + 1}`}
                    >
                        <img src={img} alt=""/>
                    </button>
                ))}
            </div>
            <div className={cls.mainImage}>
                <img src={images[activeIndex]} alt={`${productName} ${color.name}`}/>
            </div>
        </div>
    );
};