import { useSelector } from 'react-redux';
import FlowerItem from '../../../components/FlowerItem';
import Skeleton from '../../../components/skeleton/Skeleton';

function Authors({ isLoading }) {
  const itemsHome = useSelector(state => state.item.items);
  const authorsItems = itemsHome.map((obj, index) => obj.sectionId == 98 && <FlowerItem key={index} isLoading={isLoading} {...obj} />);
  const skeletons = [...new Array(4)].map(index => <Skeleton key={index} />);

  const sectionsHeads = window.sectionsHeads;
  return (
    <section className='authors' id='authors'>
      <div className='authors__container'>
        <h2 className='authors__head'>{sectionsHeads.authors}</h2>

        <div className='items'>{isLoading ? skeletons : authorsItems}</div>
      </div>
    </section>
  );
}

export default Authors;
