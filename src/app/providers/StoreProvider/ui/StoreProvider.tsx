import {Provider} from "react-redux";
import {persistor, store} from "@/app/providers/StoreProvider/config";
import {ReactNode} from "react";
import {PersistGate} from "redux-persist/integration/react";
export interface StoreProviderProps {
    children?: ReactNode;

}

export const StoreProvider = (props: StoreProviderProps) => {
    const {children} = props;

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            {children}
            </PersistGate>
        </Provider>
    );
};