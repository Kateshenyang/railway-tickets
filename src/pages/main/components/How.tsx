import '../main.css';

// Интерфейс для элемента "Как это работает"
interface HowItem {
  imageClass: string;
  text: string;
}

// Компонент "Как это работает" - отображает преимущества сервиса
export const How = () => {
  // Данные для элементов "Как это работает"
  const howItems: HowItem[] = [
    {
      imageClass: 'how__image-first',
      text: 'Удобный заказ на сайте'
    },
    {
      imageClass: 'how__image-second',
      text: 'Нет необходимости ехать в офис'
    },
    {
      imageClass: 'how__image-third',
      text: 'Огромный выбор направлений'
    }
  ];

  // Обработчик клика по кнопке "Узнать больше"
  const handleLearnMore = () => {
    // TODO: Добавить функционал для кнопки "Узнать больше"
    console.log('Learn more clicked');
  };

  return (
    <section id='how' className='main__how'>
      <div className='how__title'>
        <h2 className='how__title-text'>как это работает</h2>
        <button
          className='how__title-btn'
          type='button'
          onClick={handleLearnMore}
        >
          Узнать больше
        </button>
      </div>
      <div className='how__items'>
        {howItems.map((item, index) => (
          <div key={index} className='how__item'>
            <div className={item.imageClass} />
            <p className='how__content-text'>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
