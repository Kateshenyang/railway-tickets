import '../main.css';

// Компонент "О нас" - отображает информацию о компании
export const About = () => {
  // Тексты для секции "О нас"
  const aboutTexts = [
    'Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем все больше людей заказывают жд билеты через интернет.',
    'Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать? Мы расскажем о преимуществах заказа через интернет.',
    'Покупать жд билеты дешево можно за 90 суток до отправления поезда. Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.'
  ];

  return (
    <section id='about' className='main__about'>
      <h2 className='about__title'>о нас</h2>
      <div className='about__content'>
        <div className='about__line' />
        <div>
          {aboutTexts.map((text, index) => (
            <p
              key={index}
              className={`about__text ${index === aboutTexts.length - 1 ? 'about__text-last' : ''}`}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
