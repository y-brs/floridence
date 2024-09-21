import React from 'react';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Style from './Popup.module.scss';

function Popup({}) {
	const popupName = useSelector((state) => state.popup.name);
	const isShow = useSelector((state) => state.popup.show);
	const isDelete = useSelector((state) => state.popup.isDelete);

	return (
		<div className={isShow ? Style.popup : Style.popup_close}>
			<p className={Style.text}>
				{!isDelete ? (
					<>
						<CheckCircleFilled className={Style.icon} />
						{popupName} добавлен в корзину
					</>
				) : (
					<>
						<CloseCircleFilled className={Style.icon_close} />
						{popupName} удален из корзины
					</>
				)}
			</p>
		</div>
	);
}
export default Popup;
