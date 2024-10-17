import { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import axios from 'axios';
import { useDispatch } from 'react-redux';

import supportsWebP from 'supports-webp';

import { addBasketCount, addBasketSum } from './redux/slices/cartSlice';
import { addCategory } from './redux/slices/categorySlice';
import { addHomeItem, addPromoItem } from './redux/slices/itemSlice';

import Cart from './components/Cart';
import Footer from './components/Footer';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import Home from './pages/Home/Home';

import './scss/app.scss';

function App() {
  const dispatch = useDispatch();
  const isWebpUse = useRef(false);
  const [cartItems, setCartItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const currentPage = useRef(1);
  const [pageCount, setPageCount] = useState(6);

  async function fetchMainData(page) {
    try {
      const bitrixResponse = await axios.get(`https://floridence.com/bitrix/services/main/ajax.php?c=goodde:ajax&mode=class&action=elementlist&page=${page}`);

      setPageCount(bitrixResponse.data.pagination.pageCount);

      if (await supportsWebP) {
        isWebpUse.current = true;
      } else {
        isWebpUse.current = false;
      }

      bitrixResponse.data.list.map(item => {
        const itemHomeData = {
          id: Number(item.ID),
          defaultPicture:
            item.RESIZE_IMAGE && isWebpUse.current == true ? item.RESIZE_IMAGE.PIC_WEBP : item.RESIZE_IMAGE && isWebpUse.current == false ? item.RESIZE_IMAGE.PIC : item.PREVIEW_PICTURE.SRC,
          gif: item.GIF_PHOTO,
          video: item.VIDEO,
          description: item.PREVIEW_TEXT,
          morePhoto: item.MORE_PHOTO_RESIZE_IMAGE || [],
          offers: item.OFFERS,
          treeProps: item.TREE_PROPS,
          price: item.PRICES,
          minPrice: item.MIN_PRICE,
          category: item.CATEGORY,
          name: item.NAME,
          properties: item.PROPERTIES,
          sectionId: item.IBLOCK_SECTION_ID,
          quantity: item.QUANTITY,
          sort: Number(item.SORT),
        };
        dispatch(addHomeItem(itemHomeData));
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchMainData(currentPage.current);

    async function fetchData() {
      try {
        setIsLoading(true);
        const [categoryResponse, hitResponse, cartResponse] = await Promise.all([
          axios.get(`https://floridence.com/bitrix/services/main/ajax.php?c=goodde:ajax&mode=class&action=sectionlist`),
          axios.get(`https://floridence.com/bitrix/services/main/ajax.php?c=goodde:ajax&mode=class&action=elementlisthit`),
          axios.get(`https://floridence.com/bitrix/services/main/ajax.php?c=goodde:ajax&mode=class&action=basketcount`),
        ]);
        // if (typeof BX.Sale === 'object' && typeof BX.Sale.BasketComponent === 'object') {
        //   const data = new FormData();
        //   data.append('via_ajax', 'Y');
        //   data.append('preloader_remove', 'Y');
        //   data.append('fullRecalculation', 'Y');
        //   data.append('basketAction', 'recalculateAjax');
        //   data.append('site_id', BX.Sale.BasketComponent.siteId);
        //   data.append('sessid', BX.bitrix_sessid());
        //   data.append('template', BX.Sale.BasketComponent.template);
        //   data.append('signedParamsString', BX.Sale.BasketComponent.signedParamsString);

        //   try {
        //     const response = await axios.post('https://floridence.com/bitrix/components/bitrix/sale.basket.basket/ajax.php', data, {
        //       headers: {
        //         'Content-Type': 'multipart/form-data',
        //       },
        //     });

        //     response.data.BASKET_DATA.BASKET_ITEM_RENDER_DATA.map((item, index) => {
        //       const itemData = {
        //         id: Number(item.PRODUCT_ID),
        //         cartId: item.ID,
        //         name: item.NAME,
        //         count: item.QUANTITY,
        //         price: item.FULL_PRICE * item.QUANTITY,
        //         oneItemPrice: item.FULL_PRICE,
        //         imageUrl: item.IMAGE_URL,
        //       };

        //       dispatch(addItem(itemData, dispatch));
        //     });
        //   } catch (error) {
        //     console.error(error);
        //   }
        // }
        if (await supportsWebP) {
          isWebpUse.current = true;
        } else {
          isWebpUse.current = false;
        }
        setCartItems(cartResponse.data);

        Object.values(categoryResponse.data).map((item, index) => {
          const itemCategoryData = {
            id: Number(item.id),
            name: item.name,
            picture: item.picture,
            code: item.code,
          };
          dispatch(addCategory(itemCategoryData));
        });

        hitResponse.data.map(item => {
          const itemPromo = {
            id: item.ID,
            defaultPicture:
              item.RESIZE_IMAGE && isWebpUse.current == true ? item.RESIZE_IMAGE.PIC_WEBP : item.RESIZE_IMAGE && isWebpUse.current == false ? item.RESIZE_IMAGE.PIC : item.PREVIEW_PICTURE.SRC,
            description: item.PREVIEW_TEXT,
            morePhoto: item.MORE_PHOTO_RESIZE_IMAGE,
            offers: item.OFFERS,
            treeProps: item.TREE_PROPS,
            price: item.PRICES,
            minPrice: item.MIN_PRICE,
            category: item.CATEGORY,
            name: item.NAME,
            properties: item.PROPERTIES,
            sectionId: item.IBLOCK_SECTION_ID,
            quantity: item.QUANTITY,
          };
          dispatch(addPromoItem(itemPromo));
        });

        dispatch(addBasketCount(cartResponse.data.BASKET_COUNT));
        dispatch(addBasketSum(cartResponse.data.BASKET_SUM));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    window.scrollTo(0, 0);

    fetchData();

    var videoElements = document.querySelectorAll('video');

    videoElements.forEach(function (videoElement) {
      videoElement.controls = false;

      videoElement.addEventListener('play', function () {
        this.controls = false;
      });

      videoElement.addEventListener('pause', function () {
        this.controls = false;
      });
    });
  }, []);

  const handleNextPageClick = () => {
    if (currentPage.current < pageCount) {
      fetchMainData(currentPage.current + 1);
      currentPage.current = currentPage.current + 1;
    }
  };

  return (
    <>
      <Header cartItems={cartItems} />
      <Cart cartItems={cartItems} />
      <MobileMenu />

      <Routes>
        <Route path='/' element={<Home isLoading={isLoading} showMore={handleNextPageClick} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
