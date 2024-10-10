import React from 'react';
import ContentLoader from 'react-content-loader';

const BigSkeleton = (props) => (
	<ContentLoader
		speed={2}
		width={700}
		height={900}
		viewBox="0 0 700 900"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}>
		<rect x="0" y="0" rx="0" ry="0" width="630" height="720" />
		<rect x="2" y="749" rx="10" ry="10" width="436" height="20" />
		<rect x="0" y="782" rx="10" ry="10" width="166" height="18" />
		<rect x="98" y="811" rx="5" ry="5" width="100" height="36" />
		<rect x="0" y="814" rx="10" ry="10" width="69" height="28" />
	</ContentLoader>
);

export default BigSkeleton;
