import React from 'react';
import ContentLoader from 'react-content-loader';

const SectionSkeleton = (props) => (
	<ContentLoader
		speed={2}
		width={1250}
		height={1200}
		viewBox="0 0 1250 1200"
		backgroundColor="#dedede"
		foregroundColor="#c0eccd"
		{...props}>
		<rect x="0" y="50" rx="5" ry="5" width="288" height="335" />
		<rect x="0" y="400" rx="5" ry="5" width="252" height="20" />
		<rect x="1" y="432" rx="5" ry="5" width="129" height="20" />
		<rect x="0" y="469" rx="5" ry="5" width="109" height="30" />
		<rect x="140" y="466" rx="5" ry="5" width="101" height="40" />
		<rect x="0" y="0" rx="0" ry="0" width="579" height="35" />
		<rect x="0" y="540" rx="5" ry="5" width="288" height="335" />
		<rect x="0" y="890" rx="5" ry="5" width="252" height="20" />
		<rect x="1" y="922" rx="5" ry="5" width="129" height="20" />
		<rect x="0" y="959" rx="5" ry="5" width="109" height="30" />
		<rect x="140" y="956" rx="5" ry="5" width="101" height="40" />
		<rect x="305" y="50" rx="5" ry="5" width="288" height="335" />
		<rect x="305" y="400" rx="5" ry="5" width="252" height="20" />
		<rect x="306" y="432" rx="5" ry="5" width="129" height="20" />
		<rect x="305" y="469" rx="5" ry="5" width="109" height="30" />
		<rect x="445" y="466" rx="5" ry="5" width="101" height="40" />
		<rect x="305" y="540" rx="5" ry="5" width="288" height="335" />
		<rect x="305" y="889" rx="5" ry="5" width="252" height="20" />
		<rect x="306" y="921" rx="5" ry="5" width="129" height="20" />
		<rect x="305" y="958" rx="5" ry="5" width="109" height="30" />
		<rect x="445" y="955" rx="5" ry="5" width="101" height="40" />
		<rect x="686" y="427" rx="5" ry="5" width="101" height="40" />
		<rect x="686" y="916" rx="5" ry="5" width="101" height="40" />
		<rect x="608" y="50" rx="5" ry="5" width="288" height="335" />
		<rect x="608" y="400" rx="5" ry="5" width="252" height="20" />
		<rect x="609" y="432" rx="5" ry="5" width="129" height="20" />
		<rect x="748" y="466" rx="5" ry="5" width="101" height="40" />
		<rect x="608" y="540" rx="5" ry="5" width="288" height="335" />
		<rect x="608" y="890" rx="5" ry="5" width="252" height="20" />
		<rect x="609" y="922" rx="5" ry="5" width="129" height="20" />
		<rect x="748" y="956" rx="5" ry="5" width="101" height="40" />
		<rect x="913" y="50" rx="5" ry="5" width="288" height="335" />
		<rect x="913" y="400" rx="5" ry="5" width="252" height="20" />
		<rect x="914" y="432" rx="5" ry="5" width="129" height="20" />
		<rect x="913" y="469" rx="5" ry="5" width="109" height="30" />
		<rect x="1053" y="466" rx="5" ry="5" width="101" height="40" />
		<rect x="913" y="540" rx="5" ry="5" width="288" height="335" />
		<rect x="913" y="889" rx="5" ry="5" width="252" height="20" />
		<rect x="914" y="921" rx="5" ry="5" width="129" height="20" />
		<rect x="913" y="958" rx="5" ry="5" width="109" height="30" />
		<rect x="1053" y="955" rx="5" ry="5" width="101" height="40" />
	</ContentLoader>
);

export default SectionSkeleton;
