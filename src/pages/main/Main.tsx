import { About } from './components/About';
import { How } from './components/How';
import { Reviews } from '../../components/reviews/Reviews';
import './main.css';

// Главный компонент страницы - объединяет все секции главной страницы
export const Main = () => {
  return (
    <main className='main'>
      <About />
      <How />
      <Reviews />
    </main>
  );
};
