import 'swiper/css';
import 'swiper/css/pagination';

import Style from './PromoItem.module.scss';

function PromoItem({ name, price, defaultPicture, offers }) {
  const productPriceValue = Object.values(price)[0]?.PRICE;
  const offerPriceValue = Object.values(offers)[0]?.PRICES;

  return (
    <div className={Style.promo_item}>
      <div className={Style.promo_item_container}>
        <img className={Style.promo_item_img} src={`https://floridence.com${defaultPicture}`} alt={name} loading='lazy' decoding='async' />

        <div className={Style.promo_item_desc}>
          <h3 className={Style.promo_item_name}>{name}</h3>
          <span className={Style.promo_item_price}>
            {new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 3 }).format(productPriceValue ? productPriceValue : Object.values(offerPriceValue)[0]?.PRICE)}&nbsp;₽
          </span>
        </div>
      </div>
    </div>
  );
}

export default PromoItem;
