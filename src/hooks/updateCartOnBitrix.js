import axios from 'axios';
import { addBasketCount, addBasketSum, addItem } from '../redux/slices/cartSlice';
import { setWaitForResponse } from '../redux/slices/itemSlice';

export const updateCartOnBitrix = async (id, action, quantity, items, dispatch) => {
  // console.log(items);
  if (typeof BX.Sale === 'object' && typeof BX.Sale.BasketComponent === 'object') {
    const data = new FormData();
    data.append('via_ajax', 'Y');
    data.append('preloader_remove', 'Y');
    data.append('fullRecalculation', 'Y');
    data.append('basketAction', 'recalculateAjax');
    data.append('site_id', BX.Sale.BasketComponent.siteId);
    data.append('sessid', BX.bitrix_sessid());
    data.append('template', BX.Sale.BasketComponent.template);
    data.append('signedParamsString', BX.Sale.BasketComponent.signedParamsString);

    const currentItemId = items.filter(item => item.id === id)[0]?.cartId;
    if (action === 'delete') {
      data.append(`basket[DELETE_${currentItemId}]`, 'Y');
    } else if (action === 'updateQuantity') {
      data.append(`basket[QUANTITY_${currentItemId}]`, quantity);
    }

    try {
      const [response, cartStateResponse] = await Promise.all([
        axios.post('/bitrix/components/bitrix/sale.basket.basket/ajax.php', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
        axios.get(`/bitrix/services/main/ajax.php?c=goodde:ajax&mode=class&action=basketcount`),
      ]);
      response?.data?.BASKET_DATA?.BASKET_ITEM_RENDER_DATA?.map((item, index) => {
        const itemData = {
          id: Number(item.PRODUCT_ID),
          cartId: Number(item.ID),
          name: item.NAME,
          count: item.QUANTITY,
          price: item.FULL_PRICE * item.QUANTITY,
          oneItemPrice: item.FULL_PRICE,
          imageUrl: item.IMAGE_URL,
        };

        action !== 'delete' && dispatch(addItem(itemData));
      });
      dispatch(addBasketCount(cartStateResponse.data.BASKET_COUNT));
      dispatch(addBasketSum(cartStateResponse.data.BASKET_SUM));
      if (response.status === 200) {
        // console.log(
        // 	'[backend data',
        // 	response.data.BASKET_DATA.BASKET_ITEM_RENDER_DATA,
        // 	'][action:',
        // 	action,
        // 	'][id:',
        // 	id,
        // 	'][quantity:',
        // 	quantity,
        // 	'][cartStateResponse.data:',
        // 	cartStateResponse.data,
        // 	'][currentItemId:',
        // 	currentItemId,
        // 	'][good update]',
        // );
      } else {
        console.error('Ошибка при обновлении корзины');
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setWaitForResponse(false));
    }
  }
};
