import { useEffect } from 'react';
import CustomMap from '../components/yandexMap/CustomMap';

function Contacts() {
  const sectionsHeads = window.sectionsHeads;
  const contactsContentText = window.contactsContentText;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='contacts'>
      <div className='contacts__container'>
        <h3 className='contacts__lowhead'>{sectionsHeads.contactsLowHead}</h3>

        <h1 className='contacts__head'>{sectionsHeads.contactsHead}</h1>
        <p className='contacts__map-head'>{contactsContentText.mapText}</p>
        <div className='contacts__content'>
          <div className='contacts__map'>
            <div className='map'>
              <CustomMap />
            </div>
          </div>
          <div className='contacts__content-text'>
            <div className='contacts__content-links'>
              <a href={'tel:' + contactsContentText.phoneLink}>{contactsContentText.phone}</a>
              <span>{contactsContentText.linksUnder}</span>
              <a href={'mailto:' + contactsContentText.mail}>{contactsContentText.mail}</a>
            </div>
            <div className='contacts__content-data'>
              <h4 className='contacts__content-data-head'>{sectionsHeads.contactsContentHead}</h4>
              {contactsContentText.datas.map((item, index) => (
                <p key={index} className='contacts__content-data-text'>
                  <span>{item.name} </span>
                  {item.number}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
