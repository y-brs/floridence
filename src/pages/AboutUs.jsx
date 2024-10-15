import { useEffect } from 'react';

function AboutUs() {
  const sectionHead = window.sectionsHeads;
  const aboutBanner = window.aboutBanner;
  const aboutCard = window.aboutCard;
  const aboutList = window.aboutList;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='about'>
      <div className='about__container'>
        <h3 className='about__lowhead'>{sectionHead.aboutHead}</h3>

        <div className='about__banner'>
          <h1 className='about__banner-head'>{sectionHead.aboutBannerHead}</h1>
          <div className='about__banner-text-cont'>
            <p className='about__banner-text'>{aboutBanner.bannerText}</p>
            <img src={aboutBanner.imgUrl} alt='' className='about__banner-img' />
          </div>
        </div>

        <div className='about__card'>
          <h3 className='about__card-head'>{sectionHead.aboutCardHead}</h3>

          <div className='about__item-mobile'>
            <div className='about__item-mobile-img'>
              <img src={aboutCard.imgUrl} alt='' />
              <div>
                <h3 className='about__item-mobile-name'>{aboutCard.name}</h3>
                <h4 className='about__item-mobile-job'>{aboutCard.jobTitle}</h4>
              </div>
            </div>
            <div className='about__item-mobile-description'>
              <p className='about__item-mobile-text'>{aboutCard.description}</p>
            </div>
          </div>
          <div className='about__item'>
            <div className='about__item-img'>
              <img src={aboutCard.imgUrl} alt='' />
            </div>
            <div className='about__item-img-desc'>
              <h3 className='about__item-name'>{aboutCard.name}</h3>
              <h4 className='about__item-job'>{aboutCard.jobTitle}</h4>
              <p className='about__item-text'>{aboutCard.description}</p>
            </div>
          </div>
        </div>

        <div className='about__advantages'>
          <h3 className='about__advantages-head'>{sectionHead.aboutListHead}</h3>

          <div className='about__advantages-list'>
            {aboutList.map((item, index) => (
              <div key={index} className='about__advantages-item'>
                <img src={item.imgUrl} alt='' className='about__advantages-img' />
                <p className='about__advantages-text'>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
