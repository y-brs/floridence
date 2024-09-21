import React, { useState, useEffect } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import Style from './PromoItem.module.scss';

function PromoItem({ name, price, defaultPicture, offers }) {
	const [productPrice, setProductPrice] = useState(null);

	const productPriceValue = Object.values(price)[0]?.PRICE;
	const offerPriceValue = Object.values(offers)[0]?.PRICES;
	useEffect(() => {
		setProductPrice(productPriceValue || Object.values(offerPriceValue)[0]?.PRICE);
	}, []);
	return (
		<>
			<div className={Style.promo_item}>
				<div className={Style.promo_item_container}>
					<img className={Style.promo_item_img} src={defaultPicture} alt="" />

					<div className={Style.promo_item_desc}>
						<h3 className={Style.promo_item_name}>{name}</h3>
						<span className={Style.promo_item_price}>{ new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(productPrice).replace(".", "").split(',')[0]} ₽</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default PromoItem;
