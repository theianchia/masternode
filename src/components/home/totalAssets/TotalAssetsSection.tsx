import { FC, useState, useEffect } from 'react';
import { Coin } from '@/props/Coin';
import { Node } from '@/props/Node';
import { useRouter } from 'next/router';
import nFormatter from '@/utils/nFormatter';
import { CURRENCIES_MAP } from '@/utils/constants';

type Props = {
	nodesValue: Map<string, number>;
	node: Node;
	coin: Coin;
};

const TotalAssetsSection: FC<Props> = ({ nodesValue, node, coin }) => {
	const [currentPrice, setCurrentPrice] = useState(
		coin.market_data.current_price.usd
	);

	const router = useRouter();
	const currency = router.query.currency as string;
	let currencyKey = 'usd';
	if (currency !== undefined && CURRENCIES_MAP.has(currency)) {
		currencyKey = CURRENCIES_MAP.get(currency) as string;
	}

	useEffect(() => {
		setCurrentPrice(coin.market_data.current_price[currencyKey]);
	}, [router.query, coin]);

	let currentValue = 0;
	if (nodesValue.has(node.lastReward.amount.coin)) {
		currentValue = nodesValue.get(node.lastReward.amount.coin) as number;
	}

	return (
		<div className="flex">
			<div className="text-lg md:text-xl lg:text-2xl">
				<p>{node.lastReward.amount.coin}</p>
				<hr className="h-0.5 border-0 bg-black my-1 md:my-2 lg:my-3" />
				<p className="font-bold text-sm sm:text-md md:text-lg lg:text-xl text-primary-700">
					{nFormatter(currentValue, 1)} {node.lastReward.amount.coin}
				</p>
				<p className="font-bold text-sm sm:text-md md:text-lg lg:text-xl">
					${nFormatter(currentValue * currentPrice, 1)}{' '}
					{currencyKey.toUpperCase()}
				</p>
			</div>
		</div>
	);
};

export default TotalAssetsSection;
