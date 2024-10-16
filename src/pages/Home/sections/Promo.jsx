import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '../../../components/Modal';
import PromoItem from '../../../components/PromoItem';
import PromoSkeleton from '../../../components/skeleton/PromoSkeleton';
import { showHide } from '../../../utils/utils';

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
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  const promoItems = promoItemsRedux.map(obj => (
    <SwiperSlide
      key={obj.id}
      onClick={() => {
        openModal(obj.id);
      }}>
      <PromoItem {...obj} />
    </SwiperSlide>
  ));

  const modalItem = promoItemsRedux.filter(obj => obj.id == selectedItemId).map(obj => <Modal key={obj.id} showModal={showModal} closeModal={closeModal} {...obj} />);

  const promoSkeleton = [...new Array(8)].map((_, index) => (
    <SwiperSlide key={index}>
      <PromoSkeleton />
    </SwiperSlide>
  ));

  useEffect(() => {
    showHide(showModal);
  }, [showModal]);

  return (
    <div className='promo__container'>
      {showModal && modalItem}

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
            width: 1300,
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
