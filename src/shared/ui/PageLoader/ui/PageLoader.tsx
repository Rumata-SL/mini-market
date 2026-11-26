import cls from "./PageLoader.module.scss";
import {ReactNode} from "react";
import {classNames} from "@/shared/lib/classNames/classNames";
import {Loader} from "@/shared/ui/Loader";

export interface PageLoaderProps {
    className?: string;
    children?: ReactNode;
}

export const PageLoader = ({className}: PageLoaderProps) => {
    return (
        <div className={classNames(cls.PageLoader, {}, [className])}>
            <Loader/>
        </div>
    );
};