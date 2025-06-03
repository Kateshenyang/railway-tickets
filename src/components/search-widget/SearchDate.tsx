import { InputDate } from '../calendar/InputDate';
import './search-widget.css';

// Компонент выбора дат поездки
export const SearchDate = () => {
  return (
    <div className='search__date'>
      <h2 className='search__date-text'>Дата</h2>
      <div className='search__date-inputs'>
        {/* Поле ввода даты отправления */}
        <InputDate inputStyle='date__input-from' calendarStyle='calendar__from' />
        {/* Поле ввода даты прибытия */}
        <InputDate inputStyle='date__input-to' calendarStyle='calendar__to' />
      </div>
    </div>
  );
};
