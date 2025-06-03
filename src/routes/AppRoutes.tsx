import { Route, Routes, Navigate } from "react-router-dom";
import { HeaderAndFooter } from "../pages/HeaderAndFooter";
import { Main } from "../pages/main/Main";
import { ChoiceRoute } from "../pages/choice-route/ChoiceRoute";
import { ListRoutes } from "../pages/list-routes/ListRoutes";
import { ListCoaches } from "../pages/coaches/ListCoaches";
import { ListPassengers } from "../pages/list-passengers/ListPassengers";
import { Payment } from "../pages/payment/Payment";
import { Order } from "../pages/order/Order";
import { SuccessfulOrder } from "../pages/successful-order/Successful-order";

// Компонент маршрутизации приложения
export function AppRoutes() {
  return (
    <Routes>
      {/* Основной макет с хедером и футером */}
      <Route path='' element={<HeaderAndFooter />}>
        {/* Главная страница */}
        <Route index element={<Main />} />

        {/* Маршруты для выбора и оформления билета */}
        <Route path='route' element={<ChoiceRoute />}>
          {/* Список доступных маршрутов */}
          <Route index element={<ListRoutes />} />
          {/* Выбор вагона */}
          <Route path='coach' element={<ListCoaches />} />
          {/* Ввод данных пассажиров */}
          <Route path='passengers' element={<ListPassengers />} />
          {/* Оплата */}
          <Route path='payment' element={<Payment />} />
          {/* Подтверждение заказа */}
          <Route path='order' element={<Order />} />
          {/* Редирект с несуществующих маршрутов в route */}
          <Route path='*' element={<Navigate to='/route' replace />} />
        </Route>

        {/* Страница успешного оформления заказа */}
        <Route path='success' element={<SuccessfulOrder />} />

        {/* Редирект с несуществующих маршрутов на главную */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  );
}
