import cls from "./ErrorPage.module.scss";
import {ReactNode} from "react";
import {classNames} from "@/shared/lib/classNames/classNames";

export interface ErrorPageProps {
    className?: string;
    children?: ReactNode;
}

export const ErrorPage = ({className}: ErrorPageProps) => {

    const reloadPage = () => {
        location.reload();
    };
    return (
        <div className={classNames(cls.errorpage, {}, [className])}>
            <div>Произошла непредвиденная ошибка</div>
            <div>Попробуйте обновить страницу</div>
            <button className={cls.btn} onClick={reloadPage}>Обновить страницу</button>
        </div>
    );
};