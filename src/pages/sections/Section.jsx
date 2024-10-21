import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import FlowerItem from '../../components/FlowerItem';

function Section({ id, name, showMore, code, isLoading }) {
  const sectionRef = useRef();
  const itemsHome = useSelector(state => state.item.items);

  const catalogItems = itemsHome.filter(obj => obj.sectionId == id).map((obj, index) => <FlowerItem key={obj.id} counter={index} {...obj} />);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          showMore();
        }
      });
    }, options);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className='catalog' id={code}>
      <div className='catalog__container'>
        <h2 className='catalog__head'>{name}</h2>
        <div className='items'>{catalogItems}</div>
      </div>
    </section>
  );
}

export default Section;
