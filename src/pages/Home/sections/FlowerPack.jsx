import React from 'react';
import FlowerItem from '../../../components/FlowerItem';
import Skeleton from '../../../components/skeleton/Skeleton';
import { useSelector } from 'react-redux';

function FlowerPack({ isLoading }) {
	const itemsHome = useSelector((state) => state.item.items);

	const packsItems = itemsHome.map(
		(obj, index) =>
			obj.sectionId == 99 && <FlowerItem key={index} {...obj} isLoading={isLoading} />,
	);
	const skeletons = [...new Array(2)].map((_, index) => <Skeleton key={index} />);

	const sectionsHeads = window.sectionsHeads;

	return (
		<section className="flowerpack" id="flowerspack">
			<div className="flowerpack__container">
				<h2 className="authors__head">{sectionsHeads.backets}</h2>

				<div className="items">{isLoading ? skeletons : packsItems}</div>
			</div>
		</section>
	);
}

export default FlowerPack;
