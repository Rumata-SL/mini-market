import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PromoSchema, PromoState} from "@/entities/promo/model/types/promoSchema";


const initialState: PromoSchema = {
    appliedPromo: null,
    error: null,
};

// Mock промокодов
const PROMO_CODES: PromoState[] = [
    {code: 'BUILD500', discount: 500, type: 'fixed', minOrder: 1000},
    {code: 'SALE10', discount: 10, type: 'percent'},
    {code: 'WELCOME20', discount: 20, type: 'percent', minOrder: 500},
];

export const promoSlice = createSlice({
    name: 'promo',
    initialState,
    reducers: {
        applyPromo: (state, action: PayloadAction<string>) => {
            const code = action.payload.trim().toUpperCase();
            const promo = PROMO_CODES.find((p) => p.code === code);

            if (!promo) {
                state.error = 'Промокод не найден';
                state.appliedPromo = null;
            } else {
                state.appliedPromo = promo;
                state.error = null;
            }
        },
        removePromo: (state) => {
            state.appliedPromo = null;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {actions: promoAction} = promoSlice;
export const {reducer: promoReducer} = promoSlice;