import cls from "./Errorpage.module.scss";
import {ReactNode} from "react";
import {classNames} from "@/shared/lib/classNames/classNames";

export interface ErrorPageProps {
    className?: string;
    children?: ReactNode;
}

export const Errorpage = ({className}: ErrorPageProps) => {

    const reloadPage = () => {
        location.reload();
    };
    return (
        <div className={classNames(cls.errorpage, {}, [className])}>
            <div>Произошла непредвиденная ошибка</div>
            <button onClick={reloadPage}>Обновить страницу</button>
        </div>
    );
};