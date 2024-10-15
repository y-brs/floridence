import { useCallback, useEffect, useState } from 'react';

import Modal from '../../../components/Modal';
import PromoItem from '../../../components/PromoItem';
import PromoSkeleton from '../../../components/skeleton/PromoSkeleton';

import { useSelector } from 'react-redux';

import 'swiper/css';
import 'swiper/css/pagination';
import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function Promo({ isLoading }) {
  const itemsHome = useSelector(state => state.item.items);
  const promoItemsRedux = useSelector(state => state.item.promoItems);
  const sectionHead = window.sectionsHeads;
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [modalHash, setModalHash] = useState('1');
  const [scrollPosition, setScrollPosition] = useState(0);

  const openModal = useCallback((itemId, hash) => {
    setSelectedItemId(itemId);
    setShowModal(true);
    setModalHash(hash);
    setScrollPosition(window.pageYOffset);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setModalHash(null);
    window.location.hash = '';
    const urlWithoutHash = window.location.href.split('#')[0]; // Получаем URL без хэша
    window.history.replaceState({}, document.title, urlWithoutHash); // Обновляем URL без хэша
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  const promoItems = promoItemsRedux.map(obj => (
    <SwiperSlide
      key={obj.id}
      onClick={() => {
        openModal(obj.id, selectedItemId + '1');
        setModalHash(selectedItemId + '1');
        window.location.hash = selectedItemId + '1';
      }}>
      <PromoItem {...obj} />
    </SwiperSlide>
  ));

  const modalItems = promoItemsRedux.filter(obj => obj.id == selectedItemId).map(obj => <Modal key={obj.id} showModal={showModal} closeModal={closeModal} {...obj} />);
  console.log(promoItemsRedux);

  const promoSkeleton = [...new Array(8)].map((_, index) => (
    <SwiperSlide key={index}>
      <PromoSkeleton />
    </SwiperSlide>
  ));

  // Обновляйте хэш модального окна при изменении
  useEffect(() => {
    const handleHashChange = () => {
      const urlHash = window.location.hash.substr(1); // Убираем символ #
      if (urlHash === selectedItemId + '1') {
        openModal(selectedItemId, urlHash + '1');
      }
    };

    handleHashChange(); // Проверяем при загрузке страницы

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [selectedItemId]);

  return (
    <div className='promo__container'>
      {modalItems}
      <h2 className='promo__head'>{sectionHead.promo}</h2>
      <Swiper
        breakpoints={{
          320: {
            width: 320,
            slidesPerView: 1.1,
          },
          425: {
            width: 425,
            slidesPerView: 1.5,
          },
          768: {
            width: 768,
            slidesPerView: 2.5,
          },
          1024: {
            width: 1024,
            slidesPerView: 3.5,
          },
          1300: {
            // width: 1300,
            slidesPerView: 4,
          },
        }}
        spaceBetween={20}
        pagination={{ clickable: true }}
        mousewheel={true}
        direction={'horizontal'}
        modules={[Mousewheel]}
        className='promoSwiper'>
        {isLoading ? promoSkeleton : promoItems}
      </Swiper>
    </div>
  );
}

export default Promo;
