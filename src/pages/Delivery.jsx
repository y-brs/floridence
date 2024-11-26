import { useEffect } from 'react';

function Delivery() {
  const sectionsHeads = window.sectionsHeads;
  const deliveryText = window.deliveryText;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='delivery'>
      <div className='delivery__container'>
        <div className='delivery__price delivery__section'>
          <h2 className='delivery__head'>{sectionsHeads.delivery}</h2>
          <h3 className='delivery__lowhead'>{sectionsHeads.deliveryTotal}</h3>
          <p className='delivery__text'>{sectionsHeads.deliveryListHead}</p>
          <ul className='delivery__price-list'>
            {deliveryText.deliveryListItems.map((item, index) => (
              <li key={index} className='delivery__price-list-item'>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className='delivery__how delivery__section'>
          <h2 className='delivery__head'>{sectionsHeads.deliveryHowHead}</h2>
          <h3 className='delivery__lowhead'>{sectionsHeads.deliveryHowLowhead}</h3>
          <p className='delivery__text'>{deliveryText.deliveryHowText}</p>
        </div>

        <div className='delivery__notif delivery__section'>
          <h2 className='delivery__head'>{sectionsHeads.deliveryNotifHead}</h2>
          <h3 className='delivery__lowhead'> {sectionsHeads.deliveryNotifLowhead}</h3>
          <p className='delivery__text'>{deliveryText.deliveryNotifText}</p>
        </div>

        <div className='delivery__moreinfo delivery__section'>
          <h2 className='delivery__head'>Еще несколько моментов</h2>
          <h3 className='delivery__lowhead'>Заказ в праздничные дни</h3>
          <p className='delivery__text'>
            В праздники и перед ними служба доставки цветов «Флориденс» работает в полную силу.
            Поэтому в важные для многих дни — 14 февраля, 7, 8 марта и другие — постарайтесь,
            пожалуйста, оформить заказ заранее.
            <br />
            <br />В такие дни мы стараемся доставлять цветы точно по времени, но при этом оставляем
            за собой право на доставку в течение дня!
          </p>
          <h3 className='delivery__lowhead'>Соответствие ассортимента</h3>
          <p className='delivery__text'>
            Задача соблюдения ассортимента — очень важная, и букеты «Флориденс» максимально
            соответствуют описанию в каталоге. Однако при отсутствии отдельных видов экзотических
            цветов и растений, входящих в состав букетов, корзин, композиций мы берем на себя
            смелость немного скорректировать заказ. Впрочем, всегда, когда есть возможность
            выполнить заказ в полном соответствии с описанием в карточке — мы делаем это.
            <br />
            <br />В случае отсутствия вида цветов, сезонности растений мы обязательно предложим
            заменить вид растений или цветов на аналогичный. Общая концепция букета или композиции,
            цветовая гамма и чувства, которые они передают — полностью сохранятся.
          </p>
          <h3 className='delivery__lowhead'>Отмена доставки</h3>
          <p className='delivery__text'>
            Если вам необходимо срочно отменить заказ, «Флориденс» гарантирует полный возврат
            оплаты, если выполнение вашего заказа не потребовало дополнительных расходов. Наша
            задача в таких случаях — идти навстречу просьбам клиентов, разрешать спорные ситуации в
            пользу ваших будущих покупок.
            <br />
            <br />
            Доставка возможна круглосуточно, работает без перерывов и принимает ваши заказы на
            цветы, букеты, корзины из нежных цветов в любое удобное время.
            <br />
            <br />
            Сотрудничество с «Флориденс» — это самые светлые чувства, позитивный опыт и наилучшие
            впечатления!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
