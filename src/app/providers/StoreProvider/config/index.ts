import {Action, combineReducers, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {StateSchema, ThunkExtraArg} from "@/app/providers/StoreProvider/config/StateSchema";
import {basketReducer} from "@/entities/basket";
import {productListReducer} from "@/widgets/ProductList";
import {cardProductReducer} from "@/pages/CardProduct";
import {promoReducer} from "@/entities/promo/model/slice/promoSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['app', 'basket', 'promo'],
};

const rootReducer = combineReducers({
    productList: productListReducer,
    cardProduct: cardProductReducer,
    basket: basketReducer,
    promo: promoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<StateSchema, ThunkExtraArg, Action>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;