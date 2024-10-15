import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeCart } from '../../redux/slices/cartSlice';

import CartItem from '../CartItem';

import Style from './Cart.module.scss';

function Cart({ cartItems }) {
  const isCartOpen = useSelector(state => state.cart.isCartOpen);
  const cartItemsStorage = useSelector(state => state.cart.items);
  const basketCount = useSelector(state => state.cart.basketCount);
  const basketSum = useSelector(state => state.cart.basketSum);

  const dispatch = useDispatch();

  const itemsStorage = cartItemsStorage?.map(obj => <CartItem key={obj.id} {...obj} />);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCartOpen]);
  return (
    <div className={isCartOpen ? Style.overlay : Style.overlay_closed} onClick={() => dispatch(closeCart())}>
      <div
        className={Style.cart}
        onClick={e => {
          e.stopPropagation();
        }}>
        <div className={Style.cart__container}>
          <div className={Style.cart__close}>
            <button className={Style.cart__close_btn} onClick={() => dispatch(closeCart())}>
              <svg width='44' height='44' viewBox='0 0 44 44' fill='none'>
                <path d='M2 2L42 42' stroke='black' strokeWidth='3' />
                <path d='M42 2L2 42' stroke='black' strokeWidth='3' />
              </svg>
            </button>
          </div>
          {basketCount > 0 ? (
            <>
              <h3 className={Style.cart__head}>
                {basketCount} {basketCount == 1 ? 'товар' : basketCount > 1 && basketCount < 5 ? 'товара' : basketCount > 5 && basketCount < 21 ? 'товаров' : 'товар'} на сумму {basketSum} рублей
              </h3>
              <div className={Style.cart__items}>{isCartOpen && itemsStorage}</div>
              {cartItems[0]?.BASKET_DATA?.TOTAL_RENDER_DATA?.DISCOUNT && (
                <div className={Style.cart__price}>
                  <div className={Style.cart__price_item}>
                    <p className={Style.cart__price_name}>Сумма:</p>
                    <p className={Style.cart__price_amount}>{basketSum} </p>
                  </div>

                  <div className={Style.cart__price_item}>
                    <p className={Style.cart__price_name}>Скидка:</p>
                    <p className={Style.cart__price_amount}>{cartItems[0]?.BASKET_DATA?.TOTAL_RENDER_DATA?.DISCOUNT} %</p>
                  </div>
                </div>
              )}

              <div className={Style.cart__total}>
                <p className={Style.cart__total_name}>Итого:</p>
                <p className={Style.cart__total_amount}>{basketSum} ₽</p>
              </div>
              <a href='https://floridence.com/basket/' className={Style.cart__btn}>
                Оформить заказ
              </a>
            </>
          ) : (
            <h3 className={Style.cart__head}>В корзине пусто</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
