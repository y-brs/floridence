import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import FlowerItem from '../../components/FlowerItem';
import Skeleton from '../../components/skeleton/Skeleton';

function Section({ id, name, isLoading, showMore, code }) {
  const sectionRef = useRef();
  const itemsHome = useSelector(state => state.item.items);

  const monoItems = itemsHome.filter(obj => obj.sectionId == id).map((obj, index) => <FlowerItem key={obj.id} index={index} isLoading={isLoading} {...obj} />);
  const skeletons = [...new Array(20)].map((_, index) => <Skeleton key={index} />);

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
        <div className='items'>{isLoading ? skeletons : monoItems}</div>
      </div>
    </section>
  );
}

export default Section;
