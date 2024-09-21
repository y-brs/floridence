// api.js
import axios from 'axios';
import { updateCartOnBitrix } from './updateCartOnBitrix';
import { setWaitForResponse } from '../redux/slices/itemSlice';
//
const addItemToCart = async (id, quantity, dispatch, action, cartItem, cartItems) => {
	dispatch(setWaitForResponse(true));

	await axios
		.post(
			'https://floridence.com/ajax/set_basket.php',
			new URLSearchParams({
				sessid: BX.bitrix_sessid(),
				ajax_basket: 'Y',
				action: action,
				id: id,
				ajax: '1',
				QUANTITY: quantity,
			}),
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					referrer: 'https://floridence.com/',
				},
			},
		)

		.then((response) => {
			// Успешный запрос

			// console.log(
			// 	'[addItemToCart response]',
			// 	`[id: ${id}]`,
			// 	`[quantity ${quantity}]`,
			// 	`[action ${action}]`,
			// 	`[cartItem ${cartItem}]`,
			// );
			updateCartOnBitrix(id, '', '', cartItems, dispatch);
		})
		.catch((error) => {
			console.error('Произошла ошибка при выполнении запроса:', error);
		})
		.finally(() => {});
};

export { addItemToCart };
