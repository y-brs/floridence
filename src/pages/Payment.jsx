import { useEffect } from 'react';

function Payment() {
  const sectionHead = window.sectionsHeads;
  const paymentText = window.paymentText;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1 className='payment__head'>{sectionHead.paymentHead}</h1>
        <h3 className='payment__lowhead'>{sectionHead.paymentLowHead}</h3>
        <p className='payment__text'>{paymentText.paymentText}</p>
      </div>
    </div>
  );
}

export default Payment;
