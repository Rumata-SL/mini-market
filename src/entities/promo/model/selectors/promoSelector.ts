import {StateSchema} from "@/app/providers/StoreProvider";

export const selectAppliedPromo = (state: StateSchema) => state.promo.appliedPromo;
export const selectPromoError = (state: StateSchema) => state.promo.error;