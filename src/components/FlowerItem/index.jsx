import { useCallback, useEffect, useRef, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import { useSelector } from 'react-redux';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { showHide } from '../../utils/utils';

import FlowerItemButton from '../FlowerItemButton';
import Modal from '../Modal';

import ImageHorizontal from '/assets/icons/arrow-hor.svg';
import ImageVertical from '/assets/icons/arrow.svg';

import { AnimatePresence } from 'framer-motion';

const FlowerItem = ({ product, offers, treeProps, defaultPicture, morePhoto, price, name, id, properties, description, gif, video }) => {
  const cartItems = useSelector(state => state.cart.items);
  const refCount = useRef(0);
  const refPriceSum = useRef(0);

  const [itemId, setItemId] = useState();
  const [showModal, setShowModal] = useState();
  const [offersData, setOffersData] = useState([]);
  const [values, setValues] = useState([]);

  const [modalHash, setModalHash] = useState();
  const [scrollPosition, setScrollPosition] = useState(0);

  const openModal = useCallback(hash => {
    setShowModal(true);
    setModalHash(hash);
    setScrollPosition(window.scrollY);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setModalHash(null);
    window.location.hash = '';
    const urlWithoutHash = window.location.href.split('#')[0]; // Получаем URL без хэша
    window.history.replaceState({}, document.title, urlWithoutHash); // Обновляем URL без хэша
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  useEffect(() => {
    setOffersData(offers);
    if (treeProps && treeProps.length > 0) {
      setValues(Object.values(treeProps[0]?.VALUES));
    }
  }, [offers, treeProps, offersData, product]);

  useEffect(() => {
    setItemId(id);
    const cartItemCurrent = cartItems.find(obj => obj.id === itemId);

    refCount.current = cartItemCurrent?.count || 0;
    refPriceSum.current = cartItemCurrent?.price || price[1]?.PRICE;
  }, [cartItems, itemId]);

  useEffect(() => {
    const handleHashChange = () => {
      const urlHash = window.location.hash.substring(1);
      if (urlHash === id.toString()) {
        openModal(urlHash);
      }
    };

    handleHashChange(); // Проверяем при загрузке страницы

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [id]);

  useEffect(() => {
    showHide(showModal);
  }, [showModal]);

  return (
    <div className='card__with-big'>
      <AnimatePresence>
        {showModal && (
          <Modal
            id={id}
            price={price}
            showModal={showModal}
            closeModal={closeModal}
            name={name}
            description={description}
            properties={properties}
            offers={offers}
            treeProps={treeProps}
            morePhoto={morePhoto}
            defaultPicture={defaultPicture}
            gif={gif}
            video={video}
          />
        )}
      </AnimatePresence>
      <div className='card__top'>
        <div className='card__size'>
          {properties?.HEIGHT?.VALUE && (
            <div className='card__size-height'>
              <img src={ImageVertical} alt='' />
              <span className='card__height'>{properties.HEIGHT.VALUE}</span>
            </div>
          )}

          {properties?.WIDTH?.VALUE && (
            <div className='card__size-width'>
              <img src={ImageHorizontal} alt='' />
              <span className='card__width'>{properties.WIDTH.VALUE}</span>
            </div>
          )}
        </div>
        {(morePhoto?.length > 1 && (
          <Swiper
            pagination={{
              clickable: true,
            }}
            loop={true}
            modules={[Pagination]}
            className='swiperCard'>
            {morePhoto.map((item, index) => (
              <SwiperSlide key={index}>
                <LazyLoad className='card__img'>
                  <img
                    className='card__img'
                    src={`https://floridence.com${item.PIC}`}
                    alt={name}
                    onClick={() => {
                      setModalHash(id);
                      window.location.hash = id;
                    }}
                  />
                </LazyLoad>
              </SwiperSlide>
            ))}
          </Swiper>
        )) || (
          <LazyLoad className='card__img'>
            {video !== null ? (
              <video
                onClick={() => {
                  setModalHash(id);
                  window.location.hash = id;
                }}
                className='card__img video'
                controls={false}
                autoPlay={true}
                playsInline={true}
                muted
                loop>
                <source src={`https://floridence.com${video}`} type='video/mp4' />
              </video>
            ) : gif !== null ? (
              <img
                className='card__img'
                src={`https://floridence.com${gif}`}
                alt={name}
                onClick={() => {
                  setModalHash(id);
                  window.location.hash = id;
                }}
              />
            ) : (
              <img
                className='card__img'
                src={`https://floridence.com${defaultPicture}`}
                alt={name}
                onClick={() => {
                  setModalHash(id);
                  window.location.hash = id;
                }}
              />
            )}
          </LazyLoad>
        )}
      </div>

      <div className='card__bot'>
        <div className='card__desc'>
          <h3
            className='card__name'
            onClick={() => {
              setModalHash(id);
              window.location.hash = id;
            }}>
            {name}
          </h3>
          {values?.slice(1).length > 0 && (
            <p className='card__amount'>
              Вариации букета:{' '}
              {values
                .slice(1)
                .map((item, index) => (index === values.slice(1).length - 1 ? item.NAME : item.NAME + ', '))
                .join('')}
            </p>
          )}
        </div>
        <div className='card__buy'>
          <span className='card__price'>{new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 3 }).format(price['1']?.PRICE ? price['1']?.PRICE : offers['0']?.PRICES['1'].PRICE)} ₽</span>

          <FlowerItemButton
            id={Number(Object.values(offers).length > 1 ? offersData[0]?.ID : id)}
            oneItemPrice={Object.values(offers).length > 1 ? offersData[0]?.PRICES[1]?.PRICE : price[1]?.PRICE}
            price={refPriceSum.current}
            count={refCount.current}
            imageUrl={offersData[0]?.MORE_PHOTO_RESIZE_IMAGE[0]?.PIC || morePhoto[0]?.PIC}
            name={name}
            offers={Object.values(offers)}
          />
        </div>
      </div>
    </div>
  );
};

export default FlowerItem;
