import React from 'react';
import ContentLoader from 'react-content-loader';

const ModalSkeleton = (props) => (
	<ContentLoader
		speed={2}
		width={500}
		height={500}
		viewBox="0 0 500 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}>
		<rect x="16" y="24" rx="0" ry="0" width="500" height="500" />
	</ContentLoader>
);

export default ModalSkeleton;
