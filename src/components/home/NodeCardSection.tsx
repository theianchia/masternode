import { Coin } from '@/props/Coin';
import { Node } from '@/props/Node';
import { Card } from 'flowbite-react';
import Image from 'next/image';
import { FC } from 'react';

type Props = {
	node: Node;
	nodeValue: number;
	coin: Coin;
};

const NodeCardSection: FC<Props> = ({ node, nodeValue, coin }) => {
	return (
		<div>
			<Card href="#">
				<div className="flex">
					{/* <Image
						src={coin.image.large}
						alt="Coin Logo"
						width={24}
						height={24}
					/> */}
					<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{node.coin}
					</h5>
				</div>
				<p className="font-normal text-gray-700 dark:text-gray-400">
					{nodeValue * coin.market_data.current_price.usd} USD
				</p>
			</Card>
		</div>
	);
};

export default NodeCardSection;
