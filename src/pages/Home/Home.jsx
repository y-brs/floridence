import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { openCart } from '../../redux/slices/cartSlice';

import Banner from './sections/Banner';
import Popup from '../../components/Popup';

import Section from './sections/Section';
import Promo from './sections/Promo';

import cartSvg from '../../../public/assets/icons/cart.svg';

function Home({ isLoading, showMore }) {
	const dispatch = useDispatch();
	const categoryItems = useSelector((state) => state.category.categories);
	const carItemLength = useSelector((state) => state.cart.basketCount);
	const section = categoryItems.map((item, index) => (
		<Section key={item.id} isLoading={isLoading} showMore={showMore} {...item} />
	));
	const bannerInfo = window.banner;

	return (
		<div className="">
			<Popup />

			<div className="home__cart" onClick={() => dispatch(openCart())}>
				<div className="home__cart-content">
					<img src={cartSvg} alt="" className="header__cart-img" />

					<span className="home__cart-count">{carItemLength}</span>
				</div>
			</div>
			<Promo isLoading={isLoading} />
			{bannerInfo.imgSrc && <Banner />}
			<div className="section__container">{section}</div>
		</div>
	);
}

export default Home;
