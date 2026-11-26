import {configureStore, combineReducers, ThunkDispatch, Action} from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {StateSchema, ThunkExtraArg} from "@/app/providers/StoreProvider/config/StateSchema";
import {basketReducer} from "@/entities/basket";
import {productListReducer} from "@/widgets/ProductList";
import {cardProductReducer} from "@/pages/CardProduct";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['app', 'basket'],
};

const rootReducer = combineReducers({
    productList: productListReducer,
    cardProduct: cardProductReducer,
    basket: basketReducer,
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