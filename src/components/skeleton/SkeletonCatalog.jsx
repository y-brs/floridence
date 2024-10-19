import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonCatalog() {
  return (
    <div className='skeleton__container'>
      <div className='mono'>
        <Skeleton width={200} height={28} />

        <div className='skeleton__catalog'>
          {[...new Array(20)].map((_, index) => (
            <div className='skeleton__catalog-item' key={index}>
              <div className='item_top'>
                <Skeleton height='100%' width='100%' containerClassName='max-container' />
              </div>
              <div className='item_middle'>
                <Skeleton width={200} height={25} />
              </div>
              <div className='item_bottom'>
                <div>
                  <Skeleton width={60} height={25} />
                </div>
                <div>
                  <Skeleton width={100} height={32} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkeletonCatalog;
