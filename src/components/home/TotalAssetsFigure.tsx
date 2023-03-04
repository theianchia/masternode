import { Coin } from '@/props/Coin';
import { Node } from '@/props/Node';
import nFormatter from '@/utils/nFormatter';
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
	const [nodesValueInCurrency, setNodesValueInCurrency] = useState(
		new Map<string, number>()
	);

	useEffect(() => {
		setTotalValue(0);
		setNodesValueInCurrency(new Map<string, number>());
		if (currency !== undefined && CURRENCIES_MAP.has(currency)) {
			setCurrencyKey(CURRENCIES_MAP.get(currency) as string);
		}

		const tmpNodeValueInCurrency = new Map<string, number>();

		for (const node of nodes) {
			if (nodesValue.has(node.lastReward.amount.coin) && coins.has(node.coin)) {
				const coin = coins.get(node.coin) as Coin;
				const currValue =
					(nodesValue.get(node.lastReward.amount.coin) as number) *
					coin.market_data.current_price[currencyKey];

				tmpNodeValueInCurrency.set(node.coin, currValue);
				setTotalValue(totalValue + currValue);
			}
		}

		setNodesValueInCurrency(tmpNodeValueInCurrency);
	}, [router.query]);

	return (
		<div>
			<div>
				<p className="font-bold text-4xl md:text-5xl lg:text-6xl">
					${nFormatter(totalValue, 3)} {currencyKey.toUpperCase()}
				</p>
			</div>
			<div className="flex justify-center mt-8 md:mt-10 lg:mt-12">
				<AssetsPieChart nodesValueInCurrency={nodesValueInCurrency} />
			</div>
		</div>
	);
};

export default TotalAssetsFigure;
