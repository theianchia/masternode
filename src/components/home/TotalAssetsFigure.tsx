import { Coin } from '@/props/Coin';
import { Node } from '@/props/Node';
import { useRouter } from 'next/router';
import { FC, useState, useEffect } from 'react';
import AssetsPieChart from './AssetsPieChart';

type Props = {
	nodesValue: Map<string, number>;
	nodes: Node[];
	coins: Map<string, Coin>;
};

const CURRENCIES_MAP = new Map<string, string>([
	['USD', 'usd'],
	['EUR', 'eur'],
	['SGD', 'sgd'],
	['BTC', 'btc'],
]);

const TotalAssetsFigure: FC<Props> = ({ nodesValue, nodes, coins }) => {
	const router = useRouter();
	const currency = router.query.currency as string;

	const [currencyKey, setCurrencyKey] = useState('usd');
	const [totalValue, setTotalValue] = useState(0);

	useEffect(() => {
		setTotalValue(0);
		if (currency !== undefined && CURRENCIES_MAP.has(currency)) {
			setCurrencyKey(CURRENCIES_MAP.get(currency) as string);
		}

		for (const node of nodes) {
			if (nodesValue.has(node.lastReward.amount.coin) && coins.has(node.coin)) {
				const coin = coins.get(node.coin) as Coin;
				setTotalValue(
					totalValue +
						(nodesValue.get(node.lastReward.amount.coin) as number) *
							coin.market_data.current_price[currencyKey]
				);
			}
		}
	}, [router.query]);

	return (
		<div>
			<div>
				<p className="font-bold text-4xl md:text-5xl lg:text-6xl">
					${totalValue.toFixed(0)} {currencyKey.toUpperCase()}
				</p>
			</div>
			<div className="flex justify-center mt-8 md:mt-10 lg:mt-12">
				<AssetsPieChart />
			</div>
		</div>
	);
};

export default TotalAssetsFigure;
