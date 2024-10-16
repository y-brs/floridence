import { useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateCartOnBitrix } from '../../hooks/updateCartOnBitrix';
import { addItem, minusItem, removeItem } from '../../redux/slices/cartSlice';

import Style from './CartItem.module.scss';

function CartItem({ id, count, imageUrl, name, price, oneItemPrice, amount }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [loading, setIsLoading] = useState();

  const countRef = useRef(count);

  const [countCartItem, setCountCartItem] = useState(count);
  const priceRef = useRef(price);
  const [cartItemPrice, setCartItemPrice] = useState(price);
  const [timerId, setTimerId] = useState();

  function counterCart() {
    setCountCartItem(countCartItem + 1);
    setCartItemPrice(cartItemPrice + Number(oneItemPrice));
    countRef.current = countRef.current + 1;
    priceRef.current = priceRef.current + Number(oneItemPrice);

    debounceOnClickAdd();
  }

  function disCounterCart() {
    if (countRef.current > 1) {
      setCountCartItem(countCartItem - 1);
      setCartItemPrice(cartItemPrice - Number(oneItemPrice));
      countRef.current = countRef.current - 1;
      priceRef.current = priceRef.current - Number(oneItemPrice);

      debounceOnClickMinus();
    } else {
      setCountCartItem(countCartItem - 1);
      setCartItemPrice(cartItemPrice - Number(oneItemPrice));
      countRef.current = countRef.current - 1;
      priceRef.current = priceRef.current - Number(oneItemPrice);
      debounceOnClickRemove();
    }
  }

  const onClickCartItem = () => {
    const cartItem = {
      id: id,
      price: priceRef.current,
      count: countRef.current,
    };
    dispatch(addItem(cartItem));
    updateCartOnBitrix(id, 'updateQuantity', countRef.current, cartItems, dispatch);
  };

  const onClickMinusCartItem = () => {
    const cartItem = {
      id: id,
      price: priceRef.current,
      count: countRef.current,
    };
    updateCartOnBitrix(id, 'updateQuantity', countRef.current, cartItems, dispatch);
    dispatch(minusItem(cartItem));
  };

  const onClickRemoveCartItem = () => {
    const cartItem = {
      id: id,
      price: priceRef.current,
      count: countRef.current,
    };
    !loading && dispatch(removeItem(cartItem));
    updateCartOnBitrix(id, 'delete', countRef.current, cartItems, dispatch);
    setIsLoading(false);
  };

  const debounceOnClickAdd = () => {
    clearTimeout(timerId);
    const newTimerId = setTimeout(onClickCartItem, 1000);
    setTimerId(newTimerId);
  };

  const debounceOnClickMinus = () => {
    clearTimeout(timerId);
    const newTimerId = setTimeout(onClickMinusCartItem, 1000);
    setTimerId(newTimerId);
  };

  const debounceOnClickRemove = () => {
    setIsLoading(true);
    clearTimeout(timerId);
    const newTimerId = setTimeout(onClickRemoveCartItem, 1000);
    setTimerId(newTimerId);
  };

  return (
    <div className={!loading ? Style.item : Style.item_blur}>
      <div className={Style.item__img}>
        <img src={imageUrl} alt='' />
      </div>
      <div className={Style.item__desc}>
        <div className={Style.item__head}>
          <h3 className={Style.item__name}>
            {name} {amount}
          </h3>
          <button
            className={Style.item__close}
            onClick={() => {
              debounceOnClickRemove();
            }}>
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
              <path d='M2 2L18 18' stroke='#D4D4D4' strokeWidth='3' />
              <path d='M18 2L2 18' stroke='#D4D4D4' strokeWidth='3' />
            </svg>
          </button>
        </div>

        <div className={Style.item__desc_price}>
          <span className={Style.item__desc_price_total}>
            {cartItemPrice} <span>₽</span>
          </span>
          <div className={Style.item__desc_price_moreless}>
            <button
              disabled={loading}
              className={Style.item__desc_price_minus}
              onClick={() => {
                disCounterCart();
              }}>
              –
            </button>
            <span type='text' className={Style.item__desc_price_amount}>
              {countCartItem}
            </span>

            <button
              disabled={loading}
              className={Style.item__desc_price_plus}
              onClick={() => {
                counterCart();
              }}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
