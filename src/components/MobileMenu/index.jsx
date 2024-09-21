import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu } from '../../redux/slices/mobileMenuSlice';
import { Link } from 'react-router-dom';

import Style from './MobileMenu.module.scss';
function MobileMenu() {
	const dispatch = useDispatch();
	const isMobileOpen = useSelector((state) => state.menu.isMenuOpen);

	const footerTopSocial = window.footerTopSocial;
	const footerTopLinks = window.footerTopLinks;
	const footerBottomLinks = window.footerBottomLinks;
	const footerCopyLinks = window.footerCopyLinks;
	const footerBottomPhones = window.footerBottomPhones;

	React.useEffect(() => {
		if (isMobileOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [isMobileOpen]);
	return (
		<div
			className={isMobileOpen ? Style.mobileMenu : Style.mobileMenu_close}
			onClick={() => {
				dispatch(closeMenu());
			}}>
			<div
				className={isMobileOpen ? Style.container : Style.container_close}
				onClick={(e) => {
					e.stopPropagation();
				}}>
				<div className={Style.content}>
					<button className={Style.closebtn} onClick={() => dispatch(closeMenu())}>
						<svg width="25" height="25" viewBox="0 0 25 25" fill="none">
							<path d="M1 1L24 24" stroke="#D4D4D4" strokeWidth="2" />
							<path d="M24 1L1 24" stroke="#D4D4D4" strokeWidth="2" />
						</svg>
					</button>
					<ul className={Style.menulist}>
						<li className={Style.menulist_item}>
							<Link to={footerTopLinks[0].href} onClick={() => dispatch(closeMenu())}>
								{footerTopLinks[0].name}
							</Link>
						</li>
						<li className={Style.menulist_item}>
							<Link to={footerTopLinks[1].href} onClick={() => dispatch(closeMenu())}>
								{footerTopLinks[1].name}
							</Link>
						</li>
					</ul>

					<ul className={Style.phonelist}>
						{footerBottomPhones.map((item, index) => (
							<li key={index} className={Style.phonelist_item}>
								<a
									href={'tel:' + item.href}
									className={Style.phonelist_link}
									onClick={() => dispatch(closeMenu())}>
									{item.number}
									<span>{item.place}</span>
								</a>
							</li>
						))}
					</ul>

					<ul className={Style.sociallist}>
						{footerTopSocial.map((item, index) => (
							<li key={index} className={Style.sociallist_item}>
								<a
									href={item.href}
									className={Style.sociallist_link}
									onClick={() => dispatch(closeMenu())}>
									<img src={item.imgUrl} alt="" />
								</a>
							</li>
						))}
					</ul>

					<ul className={Style.botmenu_list}>
						{footerBottomLinks.reverse().map((item, index) => (
							<li key={index} className={Style.botmenu_list_item}>
								<Link to={item.href} onClick={() => dispatch(closeMenu())}>
									{item.name}
								</Link>
							</li>
						))}
					</ul>

					<ul className={Style.copylist}>
						{footerCopyLinks.map((item, index) => (
							<li key={index} className={Style.copylist_item}>
								<a
									href={item.href}
									className={Style.copylist_item_link}
									onClick={() => dispatch(closeMenu())}>
									{item.name}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default MobileMenu;
