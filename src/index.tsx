import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {StoreProvider} from "@/app/providers/StoreProvider";
import {ErrorBoundary} from "@/app/providers/ErrorBoundary";
import {App} from "@/app/App";

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <BrowserRouter>
            <StoreProvider>
                <ErrorBoundary>
                    <App/>
                </ErrorBoundary>
            </StoreProvider>
        </BrowserRouter>
    );
}

