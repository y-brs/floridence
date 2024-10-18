function Banner() {
  const bannerInfo = window.banner;
  return (
    <section className='banner'>
      <div className='banner__container'>
        <img src={bannerInfo.imgSrc} alt='' className='banner__image' />
        <div className='banner__text'>
          <h3 className='banner__text-head'>{bannerInfo.head}</h3>
          <p className='banner__text-desc'>
            {bannerInfo.text}
            {bannerInfo.href ? (
              <a href={bannerInfo.href} className='banner__text-promo'>
                {bannerInfo.promocode}
              </a>
            ) : (
              <span className='banner__text-promo'>{bannerInfo.promocode}</span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Banner;
