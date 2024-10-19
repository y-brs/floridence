import { useDispatch, useSelector } from 'react-redux';
import { openCart } from '../redux/slices/cartSlice';

import Popup from '../components/Popup';
import Banner from './sections/Banner';

import Promo from './sections/Promo';
import Section from './sections/Section';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import ImageCart from '/assets/icons/cart.svg';

function Home({ isLoading, showMore }) {
  const dispatch = useDispatch();
  const categoryItems = useSelector(state => state.category.categories);
  const carItemLength = useSelector(state => state.cart.basketCount);
  const section = categoryItems.map((item, index) => <Section key={item.id} isLoading={isLoading} showMore={showMore} {...item} />);
  const bannerInfo = window.banner;

  const sectionSkeletons = (
    <div className='skeleton__container'>
      <div className='mono'>
        <Skeleton width={180} height={28} />
        <div className='catalog_items-skeleton'>
          {[...new Array(20)].map((_, index) => (
            <div className='catalog_item-skeleton' key={index}>
              <Skeleton height='100%' width='100%' containerClassName='max-container' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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

      <div className='section__container'>{isLoading ? sectionSkeletons : section}</div>
    </div>
  );
}

export default Home;
