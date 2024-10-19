import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ModalPriceBtn from '../ModalPriceBtn';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import IconWidth from '/assets/icons/arrow-hor.svg';
import IconHeight from '/assets/icons/arrow.svg';

import Style from './Modal.module.scss';

function Modal({ showModal, closeModal, activeItemId, name, description, properties, offers, treeProps, id, price, morePhoto, defaultPicture, gif, video }) {
  const [valuesData, setValuesData] = useState({});
  const [activeAmount, setActiveAmount] = useState(null);

  const backdrop = {
    hidden: {
      opacity: 0,
      transition: {
        ease: 'easeInOut',
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        ease: 'easeInOut',
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        ease: 'easeInOut',
        duration: 0.2,
      },
    },
  };

  treeProps &&
    useEffect(() => {
      treeProps?.length > 0 && setValuesData(treeProps[0].VALUES);
      treeProps?.length > 0 && setActiveAmount(activeItemId || Object.values(treeProps[0]?.VALUES).slice(1)[0].ID);
    }, [treeProps]);

  return (
    <motion.div onClick={closeModal} variants={backdrop} initial='hidden' animate='visible' exit='exit' className={`${Style.overlay} modal-overlay`}>
      <div className={Style.modal} onClick={e => e.stopPropagation()}>
        <button className={Style.btn_close} onClick={() => closeModal()}>
          <svg className={Style.btn_close_svg} width='34' height='34' viewBox='0 0 34 34' fill='none'>
            <path d='M2 2L32 32' stroke='black' strokeWidth='3' />
            <path d='M32 2L2 32' stroke='black' strokeWidth='3' />
          </svg>
        </button>
        <div className={Style.container}>
          <div className={Style.left__block}>
            <Swiper
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className='swiperModal'>
              {Object.values(offers).length > 1 ? (
                Object.values(offers).map(
                  (item, index) =>
                    item.TREE.PROP_118 == activeAmount &&
                    item.MORE_PHOTO_RESIZE_IMAGE.length > 0 &&
                    morePhoto.map((photo, index) => (
                      <SwiperSlide key={item.id}>
                        <img className={Style.img} src={`https://floridence.com${item.MORE_PHOTO_RESIZE_IMAGE[0]?.PIC_WEBP || photo.PIC_WEBP}`} alt={name} />
                      </SwiperSlide>
                    ))
                )
              ) : morePhoto.length > 1 ? (
                morePhoto.map((photo, index) => (
                  <SwiperSlide key={index}>
                    <img className={Style.img} src={`https://floridence.com${photo.PIC_WEBP}`} alt={name} />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <img className={Style.img} src={`https://floridence.com${defaultPicture}`} alt={name} />
                </SwiperSlide>
              )}
              {video && (
                <SwiperSlide>
                  <video className={Style.img} muted loop controls={false} autoPlay={true} playsInline={true}>
                    <source src={`https://floridence.com${video}`} type='video/mp4' />
                  </video>
                </SwiperSlide>
              )}
              {gif && (
                <SwiperSlide>
                  <img className={Style.img} src={`https://floridence.com${gif}`} alt={name} />
                </SwiperSlide>
              )}
            </Swiper>
          </div>

          <div className={Style.description}>
            <h2 className={Style.name}>{name}</h2>
            <p className={Style.about}>
              {description
                .replace(/&#40;/g, '(')
                .replace(/&#41;/g, ')')
                .replace(/&nbsp;/g, '\u00A0')
                .replace(/<br \/>/g, '\n\n')
                .replace(/&quot;/g, '"')}
            </p>

            <div className={Style.sizes}>
              {properties?.HEIGHT?.VALUE && (
                <div className={Style.height}>
                  <img src={IconHeight} alt='' />
                  <span>{properties.HEIGHT.VALUE}</span>
                </div>
              )}
              {properties?.WIDTH?.VALUE && (
                <div className={Style.width}>
                  <img src={IconWidth} alt='' />
                  <span>{properties.WIDTH.VALUE}</span>
                </div>
              )}
            </div>
            {treeProps.length > 0 && (
              <ul className={Style.number}>
                {Object.values(valuesData)
                  .slice(1)
                  .map((prop, index) => (
                    <li className={activeAmount === prop.ID ? Style.active : Style.non_active} key={index} onClick={() => setActiveAmount(prop.ID)}>
                      {prop.NAME}
                    </li>
                  ))}
              </ul>
            )}

            {showModal && Object.values(offers).length > 1
              ? Object.values(offers).map(
                  item =>
                    activeAmount === item.TREE.PROP_118 && (
                      <ModalPriceBtn
                        key={item.ID}
                        id={Number(item.ID)}
                        name={item.NAME}
                        quantity={item.QUANTITY}
                        imageSrc={item.DETAIL_PICTURE.SRC}
                        priceItem={item.PRICES[1].PRICE}
                        closeModal={closeModal}
                        showModal={showModal}
                      />
                    )
                )
              : showModal && <ModalPriceBtn key={id} id={Number(id)} name={name} priceItem={price[1]?.PRICE} closeModal={closeModal} imageSrc={morePhoto[0]?.PIC} showModal={showModal} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Modal;
