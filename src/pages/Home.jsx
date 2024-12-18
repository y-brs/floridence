import { useDispatch, useSelector } from 'react-redux';
import { openCart } from '../redux/slices/cartSlice';

import Popup from '../components/Popup';
import Banner from './sections/Banner';

import Promo from './sections/Promo';
import Section from './sections/Section';

import SkeletonCatalog from '../components/skeleton/SkeletonCatalog';
import ImageCart from '/assets/icons/cart.svg';

function Home({ isLoading, showMore }) {
  const dispatch = useDispatch();
  const categoryItems = useSelector(state => state.category.categories);
  const carItemLength = useSelector(state => state.cart.basketCount);
  const section = categoryItems.map((item, index) => (
    <Section key={item.id} isLoading={isLoading} showMore={showMore} {...item} />
  ));
  const bannerInfo = window.banner;

  return (
    <div className=''>
      <Popup />

      <div className='home__cart' onClick={() => dispatch(openCart())}>
        <div className='home__cart-content'>
          <img src={ImageCart} alt='' className='header__cart-img' />

          <span className='home__cart-count'>{carItemLength}</span>
        </div>
      </div>

      <Promo isLoading={isLoading} />

      {bannerInfo.imgSrc && <Banner />}

      <div className='section__container'>{isLoading ? <SkeletonCatalog /> : section}</div>
    </div>
  );
}

export default Home;
