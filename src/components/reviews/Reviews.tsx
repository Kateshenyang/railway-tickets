import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import { reviews } from '../../utils/reviews';
import './reviews.css';

// Типы для отзыва
interface Review {
  name: string;
  image: string;
  content: string;
}

// Константы для карусели
const CAROUSEL_OFFSET = -666;
const SCROLL_THRESHOLD_MIN = 2100;
const SCROLL_THRESHOLD_MAX = 2400;
const CAROUSEL_INTERVAL = 2000;
const SCROLL_CHECK_INTERVAL = 1000;

export const Reviews = () => {
  // Создаем массив точек для навигации (исключая первые 2 отзыва)
  const dotsArray = [...reviews].slice(2);

  // Рефы и состояния
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [translate, setTranslate] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState<number>(window.scrollY);

  // Функция для обновления активной точки и позиции карусели
  const updateCarousel = (slideIndex: number): void => {
    if (!carouselRef.current) return;

    // Удаляем активный класс у всех точек
    Array.from(carouselRef.current.children).forEach(item => {
      item.classList.remove('active__dot');
    });

    // Если достигли конца карусели, возвращаемся к началу
    if (currentSlide === dotsArray.length) {
      carouselRef.current.children[0].classList.add('active__dot');
      setTranslate(0);
      setCurrentSlide(0);
    } else {
      // Иначе переходим к следующему слайду
      carouselRef.current.children[slideIndex + 1].classList.add('active__dot');
      setTranslate(CAROUSEL_OFFSET * (slideIndex + 1));
      setCurrentSlide(slideIndex + 1);
    }
  };

  // Эффект для отслеживания прокрутки страницы
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setScrollPosition(window.scrollY);
    }, SCROLL_CHECK_INTERVAL);

    return () => clearInterval(scrollInterval);
  }, []);

  // Эффект для автоматической прокрутки карусели
  useEffect(() => {
    const carouselInterval = setTimeout(() => {
      if (scrollPosition >= SCROLL_THRESHOLD_MIN && scrollPosition <= SCROLL_THRESHOLD_MAX) {
        updateCarousel(currentSlide);
      }
    }, CAROUSEL_INTERVAL);

    return () => clearTimeout(carouselInterval);
  }, [scrollPosition, currentSlide]);

  // Обработчик клика по точкам навигации
  const handleDotClick = (event: BaseSyntheticEvent): void => {
    if (!carouselRef.current) return;

    const clickedDot = event.target;
    let dotIndex = 0;

    // Находим индекс кликнутой точки
    Array.from(carouselRef.current.children).forEach((item, index) => {
      item.classList.remove('active__dot');
      if (clickedDot.classList.contains(`dot__${index}`)) {
        dotIndex = index;
        setTranslate(CAROUSEL_OFFSET * (index + 1));
      }
    });

    // Активируем выбранную точку
    clickedDot.classList.add('active__dot');

    // Если кликнули по первой точке, возвращаемся к началу
    if (clickedDot.classList.contains('dot')) {
      setTranslate(0);
    }
  };

  return (
    <div id='reviews' className='main__reviews'>
      <div className='reviews__title'>отзывы</div>
      <div className='reviews'>
        <div
          className='reviews__carousel'
          style={{ transform: `translateX(${translate}px)` }}
        >
          {reviews.map((review: Review, index: number) => (
            <div className='review' key={`${review.name}-${index}`}>
              <img
                className='review__image'
                src={review.image}
                alt={review.name}
              />
              <div className='review__content'>
                <h4 className='review__name'>{review.name}</h4>
                <p className='review__text'>{review.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='carousel__dots' ref={carouselRef}>
        <div
          className='carousel__dot dot active__dot'
          onClick={handleDotClick}
        />
        {dotsArray.map((_, index) => (
          <div
            key={`dot-${index}`}
            className={`carousel__dot dot__${index}`}
            onClick={handleDotClick}
          />
        ))}
      </div>
    </div>
  );
};
