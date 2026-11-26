import React, {Suspense, useEffect} from "react";
import "./styles/index.scss";
import "./styles/global.scss";
import {AppRouter} from "@/app/providers/router";
import {classNames} from "@/shared/lib/classNames/classNames";
import {Navbar} from "@/widgets/Navbar";
import {useAppDispatch} from "@/app/providers/StoreProvider/config";
import {fetchProductList} from "@/widgets/ProductList/model/services/fetchProductList";
import {fetchSizesList} from "@/widgets/ProductList/model/services/fetchSizes";

export const App = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProductList());
        dispatch(fetchSizesList());
    }, []);

    return (
        <div className={classNames("app", {}, [])}>
            <Suspense fallback={""}>
                <Navbar/>
                <div className="content-page">
                    <AppRouter/>
                </div>
            </Suspense>
        </div>
    );
};
