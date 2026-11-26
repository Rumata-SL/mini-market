import cls from "./Loader.module.scss";
import {ReactNode} from "react";
import {classNames} from "@/shared/lib/classNames/classNames";

export interface LoaderProps {
    className?: string;
    children?: ReactNode;
}

export const Loader = ({className}: LoaderProps) => {
    return (
        <div className={classNames(cls.Loader, {}, [className])}>
        </div>
    );
};