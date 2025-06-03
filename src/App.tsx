import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { AppRoutes } from "./routes/AppRoutes";
import './App.css';

// Корневой компонент приложения
// Оборачивает приложение в необходимые провайдеры (Redux и Router)
function App() {
  return (
    <BrowserRouter basename={import.meta.env.VITE_PUBLIC_URL}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
