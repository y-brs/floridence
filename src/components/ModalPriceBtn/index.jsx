import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { minusItem, removeItem, openCart, addItem } from '../../redux/slices/cartSlice';
import { addItemToCart } from '../../hooks/setBasket';
import { updateCartOnBitrix } from '../../hooks/updateCartOnBitrix';
import { setWaitForResponse } from '../../redux/slices/itemSlice';

import Style from './ModalPriceBtn.module.scss';

function ModalPriceBtn({ priceItem, closeModal, id, name, quantity, imageSrc, showModal }) {
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.items);
	const loading = useSelector((state) => state.item.waitForResponse);

	const [count, setCount] = React.useState(0);

	const refCount = React.useRef(0);
	const refPrice = React.useRef(0);

	const [timerId, setTimerId] = React.useState(null);
	const [price, setPrice] = React.useState(priceItem);
	function counter() {
		setCount(count + 1);
		refCount.current = refCount.current + 1;
		refPrice.current = priceItem * refCount.current;

		if (refCount.current > 0 && refCount.current < 2) {
			const cartItem = {
				id: id,
				name: name,
				price: refPrice.current,
				count: refCount.current,
				oneItemPrice: priceItem,
				maxQuantity: quantity,
				imageUrl: imageSrc,
			};

			addItemToCart(id, refCount.current, dispatch, 'ADD2BASKET', cartItem, cartItems);
		}
		debounceOnClickAdd();
	}
	function disCounter() {
		if (refCount.current > 1) {
			setCount(count - 1);
			refCount.current = refCount.current - 1;
			refPrice.current = priceItem * refCount.current;
			debounceOnClickMinus();
		} else {
			setCount(count - 1);
			refCount.current = refCount.current - 1;
			refCount.current == 0 && dispatch(setWaitForResponse(true));
			debounceOnClickRemove();
		}
	}

	const onClickAdd = () => {
		const cartItem = {
			id: id,
			name: name,
			price: refPrice.current,
			count: refCount.current,
			oneItemPrice: priceItem,
			maxQuantity: quantity,
			imageUrl: imageSrc,
		};
		dispatch(addItem(cartItem));

		if (refCount.current > 1) {
			updateCartOnBitrix(id, 'updateQuantity', refCount.current, cartItems, dispatch);
		}
	};

	const onClickMinus = () => {
		const cartItem = {
			id: id,
			price: refPrice.current,
			count: refCount.current,
			oneItemPrice: price,
		};
		updateCartOnBitrix(id, 'updateQuantity', refCount.current, cartItems, dispatch);
		dispatch(minusItem(cartItem));
	};

	const onClickRemove = () => {
		const cartItem = {
			id: id,
			count: refCount.current,
		};
		updateCartOnBitrix(id, 'delete', refCount.current, cartItems, dispatch);
		dispatch(removeItem(cartItem));
	};

	const debounceOnClickAdd = () => {
		clearTimeout(timerId);
		const newTimerId = setTimeout(onClickAdd, 1000);
		setTimerId(newTimerId);
	};

	const debounceOnClickMinus = () => {
		clearTimeout(timerId);
		const newTimerId = setTimeout(onClickMinus, 1000);
		setTimerId(newTimerId);
	};

	const debounceOnClickRemove = () => {
		clearTimeout(timerId);
		const newTimerId = setTimeout(onClickRemove, 1000);
		setTimerId(newTimerId);
	};

	function goToCart() {
		closeModal();
		dispatch(openCart());
	}
	React.useEffect(() => {
		const cartItemCurrent = cartItems.find((obj) => obj.id === id);
		refCount.current = cartItemCurrent?.count || 0;
		setCount(refCount.current);
	}, []);
	React.useEffect(() => {
		if (count > 0) {
			setPrice(priceItem * count);
		}
	}, [count, priceItem]);
	return (
		<div className={Style.price}>
			<div className={Style.price_btn_wrapper}>
				<div className={Style.price_btn}>
					<button
						disabled={loading}
						className={count == 0 || loading ? Style.minus_inactive : Style.minus}
						onClick={() => {
							disCounter();
						}}>
						-
					</button>
					<button
						disabled={loading}
						className={count == 0 || loading ? Style.plus_inactive : Style.plus}
						onClick={() => {
							counter();
							ym(53560057, 'reachGoal', 'cart');
						}}>
						<span>
							{new Intl.NumberFormat('ru-RU', {
								style: 'decimal',
								currency: 'RUB',
							}).format(price)}
							₽
						</span>
						+
					</button>
				</div>

				{count > 0 && !loading && <span className={Style.price_amount}>× {count}</span>}
				{count > 0 && loading && <div className={Style.loader}></div>}
			</div>
			{count > 0 && !loading && (
				<button
					className={Style.price_tocart}
					onClick={() => {
						goToCart();
					}}>
					Перейти в корзину
				</button>
			)}
		</div>
	);
}

export default ModalPriceBtn;
