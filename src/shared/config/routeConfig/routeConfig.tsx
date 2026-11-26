import {RouteProps} from "react-router-dom";
import {CatalogPage} from "@/pages/CatalogPage";
import {CardProduct} from "@/pages/CardProduct";
import {NotFoundPage} from "@/pages/NotFoundPage";
import {BasketPage} from "@/pages/BasketPage";

export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRouter {
    CATALOG_PAGE = "catalog_page",
    BASKET = "basket",
    CARD_PRODUCT_DETAILS = "card_product_details",
    NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRouter, string> = {
    [AppRouter.CATALOG_PAGE]: "/",
    [AppRouter.BASKET]: "/basket",
    [AppRouter.CARD_PRODUCT_DETAILS]: "/product/",
    [AppRouter.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRouter, AppRouteProps> = {
    [AppRouter.CATALOG_PAGE]: {
        path: RoutePath[AppRouter.CATALOG_PAGE],
        element: <CatalogPage/>,
    },
    [AppRouter.BASKET]: {
        path: RoutePath[AppRouter.BASKET],
        element: <BasketPage/>
    },
    [AppRouter.CARD_PRODUCT_DETAILS]: {
        path: `${RoutePath[AppRouter.CARD_PRODUCT_DETAILS]}:id`,
        element: <CardProduct/>,
    },
    [AppRouter.NOT_FOUND]: {
        path: RoutePath[AppRouter.NOT_FOUND],
        element: <NotFoundPage/>
    }
};

