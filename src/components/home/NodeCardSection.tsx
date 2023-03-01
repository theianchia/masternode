import { Coin } from '@/props/Coin';
import { Node } from '@/props/Node';
import { Card } from 'flowbite-react';
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type Props = {
	node: Node;
	nodeValue: number;
	coin: Coin;
};

const CURRENCIES_MAP = new Map<string, string>([
	['USD', 'usd'],
	['EUR', 'eur'],
	['SGD', 'sgd'],
	['BTC', 'btc'],
]);

const NodeCardSection: FC<Props> = ({ node, nodeValue, coin }) => {
	const [currentPrice, setCurrentPrice] = useState(
		coin.market_data.current_price.usd
	);

	const router = useRouter();
	const currency = router.query.currency as string;

	useEffect(() => {
		if (currency !== undefined && CURRENCIES_MAP.has(currency)) {
			const currencyKey = CURRENCIES_MAP.get(currency);
			for (const [key, value] of Object.entries(
				coin.market_data.current_price
			)) {
				if (key === currencyKey) {
					setCurrentPrice(value);
					break;
				}
			}
		}
	}, [router.query, coin]);

	return (
		<div>
			<Card href="#">
				<div className="flex items-center">
					<img
						className="w-8 h-8 mr-3"
						src={coin.image.large}
						alt="Coin Logo"
					/>
					<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{node.coin}
					</h5>
				</div>
				<p className="font-normal text-gray-700 dark:text-gray-400">
					${(nodeValue * currentPrice).toFixed(2)} {currency || 'USD'}
				</p>
			</Card>
		</div>
	);
};

export default NodeCardSection;
