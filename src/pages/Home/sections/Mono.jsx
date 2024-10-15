import { useSelector } from 'react-redux';
import FlowerItem from '../../../components/FlowerItem';
import Skeleton from '../../../components/skeleton/Skeleton';

function Mono({ isLoading }) {
  const itemsHome = useSelector(state => state.item.items);

  const monoItems = itemsHome.map((obj, index) => obj.sectionId == 97 && <FlowerItem key={index} {...obj} isLoading={isLoading} />);
  console.log(monoItems);

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <section className='mono' id='mono'>
      <div className='mono__container'>
        <h2 className='mono__head'>{sectionsHeads.mono}</h2>
        <div className='items'>{isLoading ? skeletons : monoItems}</div>
      </div>
    </section>
  );
}

export default Mono;
