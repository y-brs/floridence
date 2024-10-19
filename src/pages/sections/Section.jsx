import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import FlowerItem from '../../components/FlowerItem';

function Section({ id, name, showMore, code, isLoading }) {
  const sectionRef = useRef();
  const itemsHome = useSelector(state => state.item.items);

  const monoItems = itemsHome.filter(obj => obj.sectionId == id).map((obj, index) => <FlowerItem key={obj.id} {...obj} />);

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
    <section ref={sectionRef} className='mono' id={code}>
      <div className='mono__container'>
        <h2 className='mono__head'>{name}</h2>
        <div className='items'>{monoItems}</div>
      </div>
    </section>
  );
}

export default Section;
