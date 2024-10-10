import React from 'react';
import Skeleton from '../../../components/skeleton/Skeleton';
import FlowerItem from '../../../components/FlowerItem';
import { useSelector } from 'react-redux';

function Authors({ isLoading }) {
	const itemsHome = useSelector((state) => state.item.items);
	const authorsItems = itemsHome.map(
		(obj, index) =>
			obj.sectionId == 98 && <FlowerItem key={index} {...obj} isLoading={isLoading} />,
	);
	const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

	const sectionsHeads = window.sectionsHeads;
	return (
		<section className="authors" id="authors">
			<div className="authors__container">
				<h2 className="authors__head">{sectionsHeads.authors}</h2>

				<div className="items">{isLoading ? skeletons : authorsItems}</div>
			</div>
		</section>
	);
}

export default Authors;
