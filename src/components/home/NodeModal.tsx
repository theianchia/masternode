import { FC, useState, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import { Node } from '@/props/Node';
import { Coin } from '@/props/Coin';
import CoinGecko from 'public/coingecko.png';
import TriangleUp from 'public/triangleUp.svg';
import TriangleDown from 'public/triangleDown.svg';

type Props = {
	node: Node;
	coin: Coin;
	showModal: boolean;
	onClose: () => void;
	currencyKey: string;
};

const NODEMODALFIELDS = [
	'Stake Reward',
	'Last Stake Reward',
	'Reward Value',
	'24H Price Change',
	'24H High',
	'24H Low',
	'Last Price Update',
];

const NodeModal: FC<Props> = ({
	node,
	coin,
	showModal,
	onClose,
	currencyKey,
}) => {
	const [domLoaded, setDomLoaded] = useState(false);

	useEffect(() => {
		setDomLoaded(true);
	}, []);

	const currentPrice = coin.market_data.current_price[currencyKey];
	const priceChange24h =
		coin.market_data.price_change_24h_in_currency[currencyKey];
	const priceChange24hPercentage =
		coin.market_data.price_change_percentage_24h_in_currency[currencyKey];
	const lastRewardDate = new Date(node.lastReward.createdAt).toDateString();
	const lastUpdatedDate = new Date(coin.last_updated).toDateString();

	return (
		<>
			{domLoaded && (
				<Modal
					dismissible={true}
					show={showModal}
					onClose={onClose}
					className="bg-opacity-80"
				>
					<Modal.Header>
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
					</Modal.Header>
					<Modal.Body className="bg-gradient-to-br from-indigo-300 via-pink-200 to-amber-100">
						<div className="space-y-6">
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
									{NODEMODALFIELDS.map((field, index) => {
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
										{currencyKey.toUpperCase()}
									</p>
									<div className="flex items-center mb-1">
										<span className="mr-5 lg:mr-8">
											{priceChange24h === undefined
												? '-'
												: `$${priceChange24h.toFixed(2)}`}{' '}
											{priceChange24h === undefined
												? ''
												: currencyKey.toUpperCase()}
										</span>
										{priceChange24hPercentage === undefined ? null : (
											<div className="flex items-center">
												<span
													className={`mr-1 lg:mr-2 ${
														priceChange24hPercentage >= 0
															? 'text-green-600'
															: 'text-red-600'
													}`}
												>{`${priceChange24hPercentage.toFixed(3)}%`}</span>
												<img
													src={
														priceChange24hPercentage >= 0
															? TriangleUp.src
															: TriangleDown.src
													}
													alt="Price Change"
													className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
												/>
											</div>
										)}
									</div>
									<p className="mb-1">
										{priceChange24hPercentage === undefined
											? '-'
											: `$${coin.market_data.high_24h[currencyKey].toFixed(
													2
											  )} ${currencyKey.toUpperCase()}`}
									</p>
									<p className="mb-1">
										{priceChange24hPercentage === undefined
											? '-'
											: `$${coin.market_data.low_24h[currencyKey].toFixed(
													2
											  )} ${currencyKey.toUpperCase()}`}
									</p>
									<p className="mb-1">{lastUpdatedDate.substring(4)}</p>
								</div>
							</div>

							<p className="text-sm sm:text-base xl:text-lg leading-relaxed">
								{coin.description.en}
							</p>
						</div>
					</Modal.Body>
					<Modal.Footer className="text-gray-500">
						<a
							href="https://cakedefi.com/"
							className="flex items-center cursor-pointer"
						>
							<svg
								aria-hidden="true"
								className="w-3 h-3 mr-2"
								focusable="false"
								data-prefix="far"
								data-icon="question-circle"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
							>
								<path
									fill="currentColor"
									d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"
								></path>
							</svg>
							<span className="hover:underline">Find out more</span>
						</a>
					</Modal.Footer>
				</Modal>
			)}
		</>
	);
};

export default NodeModal;
