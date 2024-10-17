import ContentLoader from 'react-content-loader';

const Skeleton = props => (
  <ContentLoader speed={2} width='100%' height={430} viewBox='0 0 288 430' backgroundColor='#f3f3f3' foregroundColor='#ecebeb' {...props}>
    <rect x='0' y='0' rx='0' ry='10' width='288' height='300' />
    <rect x='0' y='320' rx='10' ry='5' width='288' height='20' />
    <rect x='0' y='350' rx='10' ry='5' width='163' height='18' />
    <rect x='100' y='380' rx='10' ry='5' width='100' height='36' />
    <rect x='0' y='385' rx='10' ry='5' width='69' height='28' />
  </ContentLoader>
);

export default Skeleton;
