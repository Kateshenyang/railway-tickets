import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { choiceDateFrom, choiceDateTo, sliceChoiceState } from '../../store/sliceChoice';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import './calendar.css';

type Props = {
  inputStyle: string,
  calendarStyle: string
};

export const InputDate = ({ inputStyle = '', calendarStyle }: Props) => {
  const { fromDate, toDate } = useAppSelector(sliceChoiceState);
  const dispatch = useAppDispatch();
  const datepickerRef = useRef<AirDatepicker | null>(null);
  const elementRef = useRef<HTMLInputElement>(null);

  // Функция для преобразования даты в формат Date
  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day);
  };

  // Функция для проверки валидности даты
  const isValidDate = (selectedDate: Date, isFromDate: boolean) => {
    if (isFromDate) {
      // Для даты отправления проверяем, что она не позже даты прибытия
      return !toDate || selectedDate <= parseDate(toDate);
    } else {
      // Для даты прибытия проверяем, что она не раньше даты отправления
      return !fromDate || selectedDate >= parseDate(fromDate);
    }
  };

  useEffect(() => {
    if (!elementRef.current) return;

    if (datepickerRef.current) {
      datepickerRef.current.destroy();
    }

    const isFromDate = calendarStyle.includes('from');

    datepickerRef.current = new AirDatepicker(elementRef.current, {
      dateFormat: date => date.toLocaleString("ru-RU", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      }),
      navTitles: { days: "MMMM" },
      onSelect: ({ date }) => {
        if (date && !Array.isArray(date)) {
          // Проверяем валидность выбранной даты
          if (!isValidDate(date, isFromDate)) {
            alert(isFromDate
              ? 'Дата отправления не может быть позже даты прибытия'
              : 'Дата прибытия не может быть раньше даты отправления'
            );
            return;
          }

          const formattedDate = date.toLocaleString("ru-RU", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          });

          if (isFromDate) {
            dispatch(choiceDateFrom(formattedDate));
          } else {
            dispatch(choiceDateTo(formattedDate));
          }
        }
      },
      selectedDates: isFromDate
        ? (fromDate ? [parseDate(fromDate)] : [])
        : (toDate ? [parseDate(toDate)] : []),
      autoClose: true,
      position: 'bottom',
      offset: 5,
      container: isFromDate ? '.calendar__from' : '.calendar__to',
      // Добавляем ограничения на выбор дат
      minDate: isFromDate ? new Date() : (fromDate ? parseDate(fromDate) : new Date()),
      maxDate: isFromDate ? (toDate ? parseDate(toDate) : undefined) : undefined,
    });

    return () => {
      if (datepickerRef.current) {
        datepickerRef.current.destroy();
      }
    };
  }, [calendarStyle, dispatch, fromDate, toDate]);

  useEffect(() => {
    if (datepickerRef.current && elementRef.current) {
      const currentDate = calendarStyle.includes('from') ? fromDate : toDate;
      if (currentDate) {
        const parsedDate = parseDate(currentDate);
        datepickerRef.current.selectDate(parsedDate);
      } else {
        datepickerRef.current.clear();
      }
    }
  }, [fromDate, toDate, calendarStyle]);

  return (
    <div className={calendarStyle}>
      <input
        ref={elementRef}
        className={inputStyle}
        type="text"
        placeholder="ДД.ММ.ГГ"
        value={calendarStyle.includes('from') ? fromDate : toDate}
        readOnly
      />
    </div>
  );
};
