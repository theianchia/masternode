import { Coin } from '@/props/Coin';
import { Node } from '@/props/Node';
import nFormatter from '@/utils/nFormatter';
import { useRouter } from 'next/router';
import { FC, useState, useEffect } from 'react';
import AssetsPieChart from './AssetsPieChart';
import { CURRENCIES_MAP } from '@/utils/constants';

type Props = {
	nodesValue: Map<string, number>;
	nodes: Node[];
	coins: Map<string, Coin>;
};

const TotalAssetsFigure: FC<Props> = ({ nodesValue, nodes, coins }) => {
	const router = useRouter();
	const currency = router.query.currency as string;

	const [totalValue, setTotalValue] = useState(0);
	const [nodesValueInCurrency, setNodesValueInCurrency] = useState(
		new Map<string, number>()
	);

	let currencyKey = 'usd';
	if (currency !== undefined && CURRENCIES_MAP.has(currency)) {
		currencyKey = CURRENCIES_MAP.get(currency) as string;
	}

	useEffect(() => {
		const tmpNodeValueInCurrency = new Map<string, number>();
		let tmpTotalValue = 0;

		for (const node of nodes) {
			if (nodesValue.has(node.lastReward.amount.coin) && coins.has(node.coin)) {
				const coin = coins.get(node.coin) as Coin;
				const currValue =
					(nodesValue.get(node.lastReward.amount.coin) as number) *
					coin.market_data.current_price[currencyKey];

				tmpNodeValueInCurrency.set(node.coin, currValue);
				tmpTotalValue += currValue;
			}
		}

		setNodesValueInCurrency(tmpNodeValueInCurrency);
		setTotalValue(tmpTotalValue);
	}, [router.query]);

	return (
		<div>
			<div>
				<p className="font-bold text-4xl md:text-5xl lg:text-6xl">
					${nFormatter(totalValue, 2)} {currencyKey.toUpperCase()}
				</p>
			</div>
			<div className="flex justify-center mt-8 md:mt-10 lg:mt-12">
				<AssetsPieChart nodesValueInCurrency={nodesValueInCurrency} />
			</div>
		</div>
	);
};

export default TotalAssetsFigure;
