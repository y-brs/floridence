import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '../../../components/Modal';
import PromoItem from '../../../components/PromoItem';
import PromoSkeleton from '../../../components/skeleton/PromoSkeleton';

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

  const promoSkeleton = [...new Array(8)].map(index => (
    <SwiperSlide key={index}>
      <PromoSkeleton />
    </SwiperSlide>
  ));

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        closeModal();
      }
    };

    const handleModalStyles = () => {
      const lockedModal = document.querySelector('.modal-overlay');
      const lockedPaddingValue = window.innerWidth - lockedModal.offsetWidth + 'px';

      if (showModal) {
        document.documentElement.style.overflow = 'hidden';
        lockedContainer.style.paddingRight = lockedPaddingValue;
        document.body.style.paddingRight = lockedPaddingValue;
      } else {
        setTimeout(() => {
          document.documentElement.style.overflow = '';
          document.body.style.paddingRight = '';
          lockedContainer.style.paddingRight = '';
        }, 200);
      }
    };

    const lockedContainer = document.querySelector('.header');

    handleModalStyles();
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

  return (
    <div className='promo__container'>
      {showModal && modalItem}

      <h2 className='promo__head'>{sectionHead.promo}</h2>

      <Swiper
        slidesPerView={1.3}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 20,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
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
