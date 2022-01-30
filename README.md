# Stellar burgers

## Описание

Бургерная на краю вселенной. Конструктор бургеров - у клиентов есть возможность самим составлять рецепты бургеров.

## Выполнен 1 эпат

Создано приложение с помощью CRA. На этапе вёрстки создана страница по макету в Figma. Для выравнивания элементов в сетке использовались Flexbox и Grid Layout. В коде используется семантическая разметка.

## Выполнен 2 эпат

Реализовано получение данных из API. Созданы новые компоненты Modal и ModalOverlay для модальных окон.
Также созданы компоненты содержимого модальных окон IngredientDetails и OrderDetails, которые передаются
в Modal как дочерние. Реализована проверка типов PropTypes новых компонентов, которые получают пропсы.

## Выполнен 3 эпат

Произведен рефакторинг BurgerConstructor, получаемые данные вынесены в контекст.
Реализова подсчёт итоговой стоимости бургера в BurgerConstructor.
Добавлен счетчик количества добавленных ингредиентов.
При нажатии на кнопку «Оформить заказ» отправляется запрос к API для получения идентификатора заказа.
Откорректирована проверка типизации.

## Выполнен 4 эпат

Произведен рефакторинг, весь стейт перенесен в Redux. Для действий с сайд-эффектами задействован redux-saga.
В компоненте BurgerIngredients доработан scroll.
Реализовано перетаскивание ингредиентов в компонент BurgerConstructor. Также в компоненте BurgerConstructor реализована сортировка.
