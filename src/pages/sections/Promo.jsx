import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '../../components/Modal';
import PromoItem from '../../components/PromoItem';

import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonPromo from '../../components/skeleton/SkeletonPromo';

import { AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function Promo({ isLoading }) {
  const sectionHead = window.sectionsHeads;

  const promoItemsRedux = useSelector(state => state.item.promoItems);
  const [showModal, setShowModal] = useState();
  const [selectedItemId, setSelectedItemId] = useState();
  const [scrollPosition, setScrollPosition] = useState(0);

  const openModal = useCallback(id => {
    setSelectedItemId(id);
    setShowModal(true);
    setScrollPosition(window.scrollY);
    document.body.style.overflowY = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    document.body.style.overflowY = 'auto';
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  const promoItems = promoItemsRedux.map(obj => (
    <SwiperSlide
      key={'P' + obj.id}
      onClick={() => {
        openModal(obj.id);
      }}>
      <PromoItem {...obj} isLoading={isLoading} />
    </SwiperSlide>
  ));

  const modalItem = promoItemsRedux.filter(obj => obj.id == selectedItemId).map(obj => <Modal key={obj.id} showModal={showModal} closeModal={closeModal} {...obj} />);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape' || e.key === 27) closeModal();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

  return (
    <div className='promo__container'>
      <AnimatePresence>{showModal && modalItem}</AnimatePresence>

      {isLoading ? (
        <SkeletonPromo />
      ) : (
        <>
          <h2 className='promo__head'>{sectionHead.promo}</h2>

          <Swiper
            slidesPerView={1.1}
            spaceBetween={20}
            breakpoints={{
              600: {
                slidesPerView: 2.1,
              },
              768: {
                slidesPerView: 2.1,
              },
              1024: {
                slidesPerView: 3.1,
              },
              1300: {
                slidesPerView: 4.2,
                spaceBetween: 30,
              },
            }}
            pagination={{ clickable: true }}
            mousewheel={true}
            direction={'horizontal'}
            modules={[Mousewheel]}
            className='promoSwiper'>
            {promoItems}
          </Swiper>
        </>
      )}
    </div>
  );
}

export default Promo;
