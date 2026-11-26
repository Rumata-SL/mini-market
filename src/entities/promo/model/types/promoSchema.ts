export interface PromoState {
    code: string;
    discount: number;
    type: 'percent' | 'fixed';
    minOrder?: number;
}

export interface PromoSchema {
    appliedPromo: PromoState | null;
    error: string | null;
}