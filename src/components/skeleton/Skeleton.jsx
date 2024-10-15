import ContentLoader from 'react-content-loader';

const Skeleton = props => (
  <ContentLoader speed={2} width={288} height={500} viewBox='0 0 288 500' backgroundColor='#f3f3f3' foregroundColor='#ecebeb' {...props}>
    <rect x='0' y='8' rx='0' ry='0' width='288' height='338' />
    <rect x='0' y='363' rx='10' ry='10' width='288' height='20' />
    <rect x='0' y='394' rx='10' ry='10' width='163' height='18' />
    <rect x='100' y='420' rx='5' ry='5' width='100' height='36' />
    <rect x='5' y='425' rx='10' ry='10' width='69' height='28' />
  </ContentLoader>
);

export default Skeleton;
