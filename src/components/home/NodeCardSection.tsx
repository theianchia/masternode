import { Coin } from '@/props/Coin';
import { Node } from '@/props/Node';
import { Card } from 'flowbite-react';
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CoinGecko from 'public/coingecko.png';
import TriangleUp from 'public/triangleUp.svg';
import TriangleDown from 'public/triangleDown.svg';
import NodeModal from './NodeModal';

type Props = {
	node: Node;
	coin: Coin;
};

const CURRENCIES_MAP = new Map<string, string>([
	['USD', 'usd'],
	['EUR', 'eur'],
	['SGD', 'sgd'],
	['BTC', 'btc'],
]);

const NODECARDFIELDS = [
	'Stake Reward',
	'Last Stake Reward',
	'Reward Value',
	'24H Price Change',
	'Last Price Update',
];

const NodeCardSection: FC<Props> = ({ node, coin }) => {
	const [currentPrice, setCurrentPrice] = useState(
		coin.market_data.current_price.usd
	);
	const [priceChange, setPriceChange] = useState(
		coin.market_data.price_change_24h_in_currency.usd
	);
	const [priceChangePercentage, setPriceChangePercentage] = useState(
		coin.market_data.price_change_percentage_24h_in_currency.usd
	);

	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	const router = useRouter();
	const currency = router.query.currency as string;

	useEffect(() => {
		let currencyKey;
		if (currency !== undefined && CURRENCIES_MAP.has(currency)) {
			currencyKey = CURRENCIES_MAP.get(currency) as string;
		} else {
			currencyKey = 'USD';
		}

		if (coin.market_data.current_price[currencyKey] === undefined) {
			return;
		}
		setCurrentPrice(coin.market_data.current_price[currencyKey]);
		setPriceChange(coin.market_data.price_change_24h_in_currency[currencyKey]);
		setPriceChangePercentage(
			coin.market_data.price_change_percentage_24h_in_currency[currencyKey]
		);
	}, [router.query, coin]);

	const lastRewardDate = new Date(node.lastReward.createdAt).toDateString();
	const lastUpdatedDate = new Date(coin.last_updated).toDateString();

	return (
		<div>
			<Card
				className="border-0 cursor-pointer shadow-sm hover:shadow-lg bg-gradient-to-br hover:bg-gradient-to-tl from-indigo-200 via-red-200 to-yellow-100 hover:from-indigo-300 hover:via-pink-300 hover:to-amber-200"
				onClick={() => {
					if (showModal) {
						handleCloseModal();
					} else {
						handleShowModal();
					}
				}}
			>
				<div className="flex items-center">
					<img
						className="w-8 h-8 mr-3"
						src={coin.image.large}
						alt="Coin Logo"
					/>
					<h5 className="text-xl sm:text-2xl lg:text-3xl font-bold">
						{node.coin}
					</h5>
				</div>
				<div className="flex items-center">
					<img
						src={CoinGecko.src}
						alt="CoinGecko"
						className="w-6 h-6 md:w-8 md:h-8 mr-2"
					/>
					<p className="font-medium text-sm sm:text-base lg:text-lg mr-3">
						CoinGecko Rank #{coin.coingecko_rank}
					</p>
				</div>
				<div className="flex items-center">
					<div className="font-medium text-sm sm:text-base xl:text-lg mr-5 md:mr-8 lg:mr-10">
						{NODECARDFIELDS.map((field, index) => {
							return (
								<div key={index}>
									<p className="mb-1">{field}</p>
								</div>
							);
						})}
					</div>
					<div className="font-light text-sm sm:text-base xl:text-lg">
						<p className="mb-1">
							{parseFloat(node.lastReward.amount.amount).toFixed(7)}{' '}
							{node.lastReward.amount.coin}
						</p>
						<p className="mb-1">{lastRewardDate.substring(4)}</p>
						<p className="mb-1">
							$
							{(
								parseFloat(node.lastReward.amount.amount) * currentPrice
							).toFixed(2)}{' '}
							{currency || 'USD'}
						</p>
						<div className="flex items-center mb-1">
							<span className="mr-5 lg:mr-8">
								{priceChange === undefined ? '-' : `$${priceChange.toFixed(2)}`}{' '}
								{priceChange === undefined ? '' : currency || 'USD'}
							</span>
							{priceChangePercentage === undefined ? null : (
								<div className="flex items-center">
									<span
										className={`mr-1 lg:mr-2 ${
											priceChangePercentage >= 0
												? 'text-green-600'
												: 'text-red-600'
										}`}
									>{`${priceChangePercentage.toFixed(3)}%`}</span>
									<img
										src={
											priceChangePercentage >= 0
												? TriangleUp.src
												: TriangleDown.src
										}
										alt="Price Change"
										className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
									/>
								</div>
							)}
						</div>
						<p className="mb-1">{lastUpdatedDate.substring(4)}</p>
					</div>
				</div>
			</Card>
			<NodeModal
				node={node}
				coin={coin}
				showModal={showModal}
				onClose={handleCloseModal}
			/>
		</div>
	);
};

export default NodeCardSection;
