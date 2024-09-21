import React, { useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';

import FlowerItem from '../../../components/FlowerItem';
import Skeleton from '../../../components/skeleton/Skeleton';

function Section({ id, name, isLoading, showMore, code }) {
  const sectionRef = useRef(null);
  const itemsHome = useSelector(state => state.item.items);

  const monoItems = itemsHome
    .filter((obj, index) => obj.sectionId == id)
    .sort((a, b) => a.sort - b.sort) // сортировка по ключу sort
    .map((obj, index) => (
      <FlowerItem
        // flowerSection={flowerSection}
        key={obj.id}
        index={index}
        {...obj}
        isLoading={isLoading}
      />
    ));

  const skeletons = [...new Array(50)].map((_, index) => <Skeleton key={index} />);

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
