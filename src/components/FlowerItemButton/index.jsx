import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../hooks/setBasket';
import { updateCartOnBitrix } from '../../hooks/updateCartOnBitrix';
import { removeItem } from '../../redux/slices/cartSlice';
import { hidePopup, setIsDelete, setName, setShow } from '../../redux/slices/popupSlice';

import Style from './FlowerItemButton.module.scss';

function FlowerItemButton({ id, count, imageUrl, name, oneItemPrice, offers }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [timerId, setTimerId] = useState();
  const [loading, setLoading] = useState(false);

  function addToCart() {
    setIsButtonClicked(!isButtonClicked);
    setLoading(true);
    if (!isButtonClicked) {
      const cartItem = {
        id: id,
        name: name,
        count: ++count,
        price: Number(oneItemPrice) * count,
        oneItemPrice: Number(oneItemPrice),
        imageUrl: imageUrl,
      };
      addItemToCart(id, count, dispatch, 'ADD2BASKET', cartItem, cartItems);
      debounceOnClickAdd();
    } else {
      const cartItem = {
        id: id,
        count: ++count,
      };
      updateCartOnBitrix(id, 'delete', count, cartItems, dispatch);
      dispatch(removeItem(cartItem));
      debounceOnClickRemove();
    }
  }

  const onClickAdd = () => {
    const cartItem = {
      id: id,
      name: offers[0].NAME ? offers[0].NAME : name,
      count: count,
      price: Number(oneItemPrice) * count,
      oneItemPrice: Number(oneItemPrice),
      imageUrl: imageUrl,
    };
    // dispatch(addItem(cartItem));
    dispatch(setIsDelete(false));
    dispatch(setName(offers[0].NAME ? offers[0].NAME : name));
    dispatch(setShow());
    setTimeout(() => {
      dispatch(hidePopup());
    }, 2000);

    setLoading(false);
  };
  const onClickRemove = () => {
    const cartItem = {
      id: id,
    };

    dispatch(setIsDelete(true));
    dispatch(setName(offers[0].NAME ? offers[0].NAME : name));
    dispatch(setShow());
    setTimeout(() => {
      dispatch(hidePopup());
    }, 2000);
    setLoading(false);
  };

  const debounceOnClickAdd = () => {
    clearTimeout(timerId);
    const newTimerId = setTimeout(onClickAdd, 1000);
    setTimerId(newTimerId);
  };
  const debounceOnClickRemove = () => {
    clearTimeout(timerId);
    const newTimerId = setTimeout(onClickRemove, 1000);
    setTimerId(newTimerId);
  };

  useEffect(() => {
    const cartItemCurrent = cartItems.find(obj => obj.id === id);
    cartItemCurrent ? setIsButtonClicked(true) : setIsButtonClicked(false);
  });

  return (
    <>
      <button
        disabled={loading}
        onClick={() => {
          addToCart();
          !isButtonClicked && ym(53560057, 'reachGoal', 'cart');
        }}
        className={isButtonClicked && !loading ? Style.card__btn_added : Style.card__btn}>
        {isButtonClicked && !loading ? 'В корзинe' : 'В корзину'}
      </button>
    </>
  );
}

export default FlowerItemButton;
