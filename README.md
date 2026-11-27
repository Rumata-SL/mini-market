# mini-market

Интернет-магазин одежды с каталогом товаров, детальной карточкой товара, корзиной и системой промокодов.

## Технологии

- **React 18** + **TypeScript**
- **Redux Toolkit** + **redux-persist**
- **React Router** (навигация между страницами)
- **Webpack** (сборка проекта)
- **SCSS Modules** (стилизация компонентов)
- **ESLint** + **@typescript-eslint** (линтинг)
- **Feature-Sliced Design** (архитектура проекта)

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build


src/
├── app/              # Инициализация приложения (провайдеры, роутинг, стор)
├── pages/            # Страницы (BasketPage, CardProduct, CatalogPage, NotFoundPage)
├── widgets/          # Крупные блоки (ProductList, Navbar, ErrorPage)
├── entities/         # Бизнес-сущности (Product, Basket, Promo)
├── features/         # Пользовательские сценарии
└── shared/           # Переиспользуемый код (UI, lib, assets, config)

Типизация API
Все данные от бэкенда строго типизированы через TypeScript интерфейсы:

Типы находятся в "@/widgets/ProductList";

Состояние детальной страницы сохраняется в URL и востанавливается при открытии ссылки

Промокоды
Система промокодов реализована через Redux слайс promo (src/entities/promo).
Моки промокодов
Тестовые промокоды находятся в файле src/entities/promo/model/slice/promoSlice.ts:
const PROMO_CODES: PromoCode[] = [
    { code: 'BUILD500', discount: 500, type: 'fixed', minOrder: 1000 },
    { code: 'SALE10', discount: 10, type: 'percent' },
    { code: 'WELCOME20', discount: 20, type: 'percent', minOrder: 500 },
];