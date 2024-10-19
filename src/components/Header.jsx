import { useEffect, useRef, useState } from 'react';
import { HashLink } from 'react-router-hash-link';

import { useDispatch, useSelector } from 'react-redux';
import { openCart } from '../redux/slices/cartSlice';
import { openMenu } from '../redux/slices/mobileMenuSlice';

import ImageCart from '/assets/icons/cart.svg';
import ImageLogo from '/assets/icons/logo.svg';
import ImageLogoMobile from '/assets/icons/logoMobile.svg';

function Header({}) {
  const dispatch = useDispatch();
  const carItemLength = useSelector(state => state.cart.basketCount);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [lastPosition, setLastPosition] = useState(0);

  const linksHeader = window?.linksHeader;
  const headerPhone = window?.headerPhone;
  const headerDropdown = window?.headerDropdown;

  const ref = useRef(null);

  const handleScroll = () => {
    if (lastPosition < window.scrollY && headerHeight * 1.5 < window.scrollY) {
      setScrolled(true);
    }
    if (window.scrollY < headerHeight * 1.5) {
      setScrolled(false);
    }

    setLastPosition(window.scrollY);
  };

  useEffect(() => {
    setHeaderHeight(ref.current.clientHeight);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastPosition]);

  return (
    <>
      <header className={scrolled ? 'header hide' : 'header show'} ref={ref}>
        <div className='header__container'>
          <div className='header__top'>
            {scrolled ? (
              <img src={ImageLogoMobile} className='header__top-logoMobile' alt='Флориденс' onClick={() => window.scrollTo(0, 0)} />
            ) : (
              <HashLink to='/'>
                <img src={ImageLogo} alt='Флориденс' width='200' height='45' className='header__top-logo' />
              </HashLink>
            )}

            <ul className={scrolled ? 'header__phonelistHide' : 'header__phonelist'}>
              <li className='header__phonelist-item'>
                <a href={`tel:${headerPhone.href}`} className='header__phonelist-link'>
                  {headerPhone.number}
                  <svg width='9' height='6' viewBox='0 0 9 6' fill='none'>
                    <path
                      d='M7.72676 0H1.27324C0.40313 0 -0.0518693 1.03432 0.536082 1.67573L3.76285 5.19583C4.15918 5.6282 4.84082 5.6282 5.23715 5.19583L8.46392 1.67572C9.05187 1.03432 8.59687 0 7.72676 0Z'
                      fill='black'
                    />
                  </svg>
                </a>
              </li>

              <ul className='header__dropdown'>
                {headerDropdown.map((phone, index) => (
                  <li className='header__dropdown-item' key={index}>
                    <a href={'tel:' + phone.href} className='header__phonelist-link'>
                      {phone.number}
                    </a>
                  </li>
                ))}
              </ul>
            </ul>

            <button className='header__burger' onClick={() => dispatch(openMenu())} aria-label='Открыть меню'>
              <svg width='21' height='19' viewBox='0 0 21 19' fill='none'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M5.33994 0.882952C4.95331 0.0435841 4.54598 0.0265846 4.17677 0.0117097C3.87508 -0.00104017 3.53092 2.16462e-05 3.18676 2.16462e-05C2.8426 2.16462e-05 2.28279 0.126458 1.80902 0.631141C1.33526 1.13582 0 2.3545 0 4.83436C0 7.31421 1.8515 9.71119 2.10962 10.0469C2.36774 10.3827 5.6841 15.6346 10.9358 17.6554C15.2999 19.3342 16.1886 19.0006 17.1362 18.9166C18.0837 18.8327 20.1933 17.6979 20.6235 16.5207C21.0537 15.3435 21.0537 14.3352 20.9252 14.1248C20.7956 13.9144 20.4514 13.789 19.9352 13.5362C19.419 13.2833 16.8781 12.0646 16.4043 11.8967C15.9305 11.7289 15.5864 11.6449 15.2411 12.1496C14.8969 12.6532 13.9069 13.789 13.6053 14.1248C13.3036 14.4616 13.0019 14.5041 12.4856 14.2512C11.9694 13.9983 10.3052 13.4671 8.33066 11.7501C6.795 10.4146 5.75816 8.76451 5.45648 8.25983C5.15479 7.75621 5.42381 7.48315 5.68302 7.23134C5.915 7.00503 6.19926 6.64272 6.45847 6.34841C6.71659 6.0541 6.80263 5.84372 6.97471 5.50798C7.14679 5.17117 7.06075 4.87686 6.93114 4.62504C6.80372 4.37217 5.79955 1.87957 5.33994 0.882952Z'
                  fill='black'
                />
              </svg>
            </button>

            <button className='header__burger' onClick={() => dispatch(openMenu())} aria-label='Открыть меню'>
              <svg width='23' height='19' viewBox='0 0 23 19' fill='none'>
                <path d='M0 2.06458H23' stroke='black' strokeWidth='3' />
                <path d='M0 16.5162H23' stroke='black' strokeWidth='3' />
                <path d='M0 9.29041H23' stroke='black' strokeWidth='3' />
              </svg>
            </button>
          </div>

          <div className='header__bot'>
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                {linksHeader.map((link, index) => (
                  <li key={index} className='header__nav-item'>
                    <a href={link.href} className='header__nav-link'>
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className='header__cart' onClick={() => dispatch(openCart())}>
              <img src={ImageCart} alt='' className='header__cart-img' />

              <span className='header__cart-count'>{carItemLength}</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
