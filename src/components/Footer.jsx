import React from 'react';

function Footer() {
	const footerTopLinks = window.footerTopLinks;
	const footerTopSocial = window.footerTopSocial;
	const footerBottomLinks = window.footerBottomLinks;
	const footerBottomPhones = window.footerBottomPhones;
	const footerCopyLinks = window.footerCopyLinks;
	const footerCopyText = window.footerCopyText;
	const footerPayment = window.footerPayment;

	return (
		<footer className="footer">
			<div className="footer-top">
				<div className="footer__container">
					<div className="footer-top__top">
						<nav className="footer-top__nav">
							<ul className="footer-top__list">
								{footerTopLinks.map((link, index) => (
									<li className="footer-top__list-item" key={index}>
										<a href={link.href} className="footer-top__list-link">
											{link.name}
										</a>
									</li>
								))}
							</ul>

							<ul className="footer-top__soc">
								{footerTopSocial.map((icon, index) => (
									<li className="footer-top__soc-item" key={index}>
										<a href={icon.href} className="footer-top__soc-link">
											<img src={icon.imgUrl} alt={icon.name} />
										</a>
									</li>
								))}
							</ul>
						</nav>
					</div>
					<div className="footer-top__bot">
						<nav className="footer-top__bot-nav">
							<ul className="footer-top__bot-list">
								{footerBottomLinks.map((link, index) => (
									<li className="footer-top__bot-list-item" key={index}>
										<a href={link.href} className="footer-top__bot-list-link">
											{link.name}
										</a>
									</li>
								))}
							</ul>

							<div className="footer-top__bot-phones">
								{footerBottomPhones.map((phone, index) => (
									<div className="footer-top__bot-phones-item" key={index}>
										<a href={'tel:' + phone.href} className="footer-top__bot-phones-link">
											{phone.number}
										</a>
										<p className="footer-top__bot-phones-desc">{phone.place}</p>
									</div>
								))}
							</div>
						</nav>
					</div>
				</div>
			</div>
			<div className="footer-bot">
				<div className="footer-bot__container">
					<div className="footer-bot__copy">
						<ul className="footer-bot__copy-list">
							{footerCopyLinks.map((copyLink, index) => (
								<li className="footer-bot__copy-list-item" key={index}>
									<a href={copyLink.href} className="footer-bot__copy-list-link">
										{copyLink.name}
									</a>
								</li>
							))}
						</ul>

						<div className="footer-bot__payment">
							{footerPayment.map((img, index) => (
								<img key={index} src={img.imgUrl} alt="" className="footer-bot__payment-img" />
							))}
						</div>
					</div>
					<div className="footer-bot__copy-block">
						<p className="footer-bot__copy-text">{footerCopyText.address}</p>
						<p className="footer-bot__copy-text">{footerCopyText.copyright}</p>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
