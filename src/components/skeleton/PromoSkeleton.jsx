import ContentLoader from 'react-content-loader';

const PromoSkeleton = props => (
  <ContentLoader speed={2} width={272} height={88} viewBox='0 0 272 88' backgroundColor='#f3f3f3' foregroundColor='#ecebeb' {...props}>
    <circle cx='53' cy='53' r='35' />
    <rect x='100' y='18' rx='0' ry='0' width='127' height='18' />
    <rect x='100' y='49' rx='0' ry='0' width='66' height='25' />
  </ContentLoader>
);

export default PromoSkeleton;
