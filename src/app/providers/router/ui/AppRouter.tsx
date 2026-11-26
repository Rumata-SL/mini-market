import React, {Suspense, useCallback} from "react";
import {Route, Routes} from "react-router-dom";
import {PageLoader} from "@/shared/ui/PageLoader";
import {AppRouteProps, routeConfig} from "@/shared/config/routeConfig/routeConfig";

export const AppRouter = () => {

    const renderWithWrapper = useCallback((route: AppRouteProps) => {
        const element = (
            <Suspense fallback={<PageLoader/>}>
                <div className="page-wrapper">{route.element}</div>
            </Suspense>
        );
        return <Route
            key={route.path}
            path={route.path}
            element={element}
        >
        </Route>;
    }, []);

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
};
