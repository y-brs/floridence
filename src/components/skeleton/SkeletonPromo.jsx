import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Swiper, SwiperSlide } from 'swiper/react';

function SkeletonPromo() {
  return (
    <>
      <h2 className='promo__head'>
        <Skeleton width={260} height={30} />
      </h2>

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
        direction={'horizontal'}
        className='promoSwiper'>
        {[...new Array(5)].map((_, index) => (
          <SwiperSlide key={index}>
            <div className='skeleton_promo-item'>
              <div className='promo-item_image'>
                <Skeleton width={68} height={68} circle={true} />
              </div>
              <div className='promo-item_descr'>
                <Skeleton width={120} height={15} />
                <Skeleton width={60} height={20} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SkeletonPromo;
