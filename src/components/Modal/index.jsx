import React from 'react';
import { useSelector } from 'react-redux';
import ModalSkeleton from '../skeleton/ModalSkeleton';
import LazyLoad from 'react-lazy-load';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

import heightSvg from '../../../public/assets/icons/arrow.svg';
import widthSvg from '../../../public/assets/icons/arrow-hor.svg';

import Style from './Modal.module.scss';
import ModalPriceBtn from '../ModalPriceBtn';

function Modal({
	showModal,
	closeModal,
	activeItemId,
	name,
	description,
	properties,
	offers,
	treeProps,
	id,
	price,
	morePhoto,
	defaultPicture,
	gif,
	video,
}) {
	const isCartOpen = useSelector((state) => state.cart.isCartOpen);
	const [valuesData, setValuesData] = React.useState({});
	const [activeAmount, setActiveAmount] = React.useState(null);

	treeProps &&
		React.useEffect(() => {
			treeProps?.length > 0 && setValuesData(treeProps[0].VALUES);
			treeProps?.length > 0 &&
				setActiveAmount(activeItemId || Object.values(treeProps[0]?.VALUES).slice(1)[0].ID);
		}, [treeProps]);

	React.useEffect(() => {
		const close = (e) => {
			if (e.keyCode === 27) {
				closeModal();
			}
		};
		if (showModal || isCartOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, [showModal]);

	return (
		<div
			className={showModal ? Style.overlay_open : Style.overlay}
			onClick={() => {
				closeModal();
			}}>
			<div
				className={Style.modal}
				onClick={(e) => {
					e.stopPropagation();
				}}>
				<button
					className={Style.btn_close}
					onClick={() => {
						closeModal();
					}}>
					<svg
						className={Style.btn_close_svg}
						width="34"
						height="34"
						viewBox="0 0 34 34"
						fill="none">
						<path d="M2 2L32 32" stroke="black" strokeWidth="3" />
						<path d="M32 2L2 32" stroke="black" strokeWidth="3" />
					</svg>
				</button>
				<div className={Style.container}>
					<div className={Style.left__block}>
						<Swiper
							spaceBetween={20}
							pagination={{
								clickable: true,
							}}
							modules={[Pagination]}
							className="swiperModal">
							{Object.values(offers).length > 1 ? (
								Object.values(offers).map(
									(item, index) =>
										item.TREE.PROP_118 == activeAmount &&
										item.MORE_PHOTO_RESIZE_IMAGE.length > 0 &&
										morePhoto.map((photo, index) => (
											<SwiperSlide key={item.id}>
												<img
													className={Style.img}
													src={item.MORE_PHOTO_RESIZE_IMAGE[0]?.PIC_WEBP || photo.PIC_WEBP}
													alt="Фото цветов"
												/>
											</SwiperSlide>
										)),
								)
							) : morePhoto ? (
								morePhoto.map((photo, index) => (
									<SwiperSlide key={index}>
										<img className={Style.img} src={photo.PIC_WEBP} alt="" />
									</SwiperSlide>
								))
							) : (
								<ModalSkeleton />
							)}
							{video !== null ? (
								<SwiperSlide>
									<video
										className={Style.img}
										muted
										loop
										controls={false}
										autoPlay={true}
										playsInline={true}>
										<source src={video} type="video/mp4" />
									</video>
								</SwiperSlide>
							) : gif !== null ? (
								<SwiperSlide>
									<img className={Style.img} src={gif} alt="flower" />
								</SwiperSlide>
							) : null}
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
									<img src={heightSvg} alt="" />
									<span>{properties.HEIGHT.VALUE}</span>
								</div>
							)}
							{properties?.WIDTH?.VALUE && (
								<div className={Style.width}>
									<img src={widthSvg} alt="" />
									<span>{properties.WIDTH.VALUE}</span>
								</div>
							)}
						</div>
						{treeProps.length > 0 && (
							<ul className={Style.number}>
								{Object.values(valuesData)
									.slice(1)
									.map((prop, index) => (
										<li
											className={activeAmount === prop.ID ? Style.active : Style.non_active}
											key={index}
											onClick={() => setActiveAmount(prop.ID)}>
											{prop.NAME}
										</li>
									))}
							</ul>
						)}

						{showModal && Object.values(offers).length > 1
							? Object.values(offers).map(
									(item) =>
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
										),
							  )
							: showModal && (
									<ModalPriceBtn
										key={id}
										id={Number(id)}
										name={name}
										priceItem={price[1]?.PRICE}
										closeModal={closeModal}
										imageSrc={morePhoto[0]?.PIC}
										showModal={showModal}
									/>
							  )}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;
