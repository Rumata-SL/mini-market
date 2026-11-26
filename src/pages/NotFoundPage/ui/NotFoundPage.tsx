import cls from "./NotFoundPage.module.scss";
import {ReactNode} from "react";
import {classNames} from "@/shared/lib/classNames/classNames";

export interface NotFoundPageProps {
    className?: string;
    children?: ReactNode;
}

export const NotFoundPage = ({className}: NotFoundPageProps) => {
    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            Страница не найдена
        </div>
    );
};