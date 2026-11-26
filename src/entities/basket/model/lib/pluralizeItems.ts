export function pluralizeItems(n: number): string {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 19) return 'товаров';
    if (mod10 === 1) return 'товар';
    if (mod10 >= 2 && mod10 <= 4) return 'товара';
    return 'товаров';
}