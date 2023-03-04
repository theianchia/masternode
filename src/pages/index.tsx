import AppBanner from '@/components/shared/AppBanner';
import MaxWidthContainer from '@/components/shared/MaxWidthContainer';
import HomePageSection from '@/components/home/HomePageSection';
import AppFooter from '@/components/shared/AppFooter';
import { Node } from '@/props/Node';
import { Coin } from '@/props/Coin';
import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import LRUCache from 'lru-cache';
import axios from 'axios';
import NodeCardSection from '@/components/home/NodeCardSection';
import Dropdown from '@/components/home/Dropdown';
import CakeDefiSymbol from 'public/cakedefiSymbol.png';
import Human from 'public/human.png';
import TotalAssetsSection from '@/components/home/TotalAssetsSection';
import TotalAssetsFigure from '@/components/home/TotalAssetsFigure';

type Props = {
	nodes: Node[];
	serializedNodesValue: string;
	serializedNodesCoin: string;
};

const cache = new LRUCache<string, Props>({
	max: 100,
	maxAge: 1000 * 60 * 60,
});

const NODEAMOUNT = new Map<string, number>([
	['DASH', 1000],
	['ETH', 10000], // Assuming 1 Ether node holds 1000 ETH
	['DFI', 20000],
]);

export const getServerSideProps: GetServerSideProps<Props> = async (
	context: GetServerSidePropsContext
) => {
	const { query } = context;
	const currency = query.currency as string;
	const cacheKey = JSON.stringify(currency);
	const cachedResponse = cache.get(cacheKey);

	if (cachedResponse !== undefined) {
		return { props: cachedResponse };
	}

	const [nodesResponse, allCoinsResponse] = await Promise.all([
		axios.get(`${process.env.API_BASE_URL}/node`),
		axios.get(`${process.env.API_BASE_URL}/allCoins`),
	]);

	const nodesData = nodesResponse.data;
	const allCoinsData = allCoinsResponse.data;

	const nodes = [];
	const nodesValue = new Map<string, number>();
	const nodesCoin = new Map<string, Coin>();

	for (const node of nodesData) {
		if (node.status !== 'ACTIVE') {
			continue;
		}

		if (nodesValue.has(node.lastReward.amount.coin)) {
			const currValue = nodesValue.get(node.lastReward.amount.coin) as number;
			const amount = NODEAMOUNT.get(node.lastReward.amount.coin) as number;
			nodesValue.set(
				node.lastReward.amount.coin,
				currValue + parseFloat(node.lastReward.amount.amount) * amount
			);
		} else {
			let coinId = '';
			for (const coinNaming of allCoinsData) {
				if (
					node.lastReward.amount.coin.toLowerCase() ===
					coinNaming.symbol.toLowerCase()
				) {
					coinId = coinNaming.id;
					break;
				}
			}

			if (coinId === '') continue;

			const coinResponse = await axios.get(
				`${process.env.API_BASE_URL}/coin?id=${coinId}`
			);
			const coinData = coinResponse.data;
			nodesCoin.set(node.coin, coinData);
			nodes.push(node);
			const amount = NODEAMOUNT.get(node.lastReward.amount.coin) as number;
			nodesValue.set(
				node.lastReward.amount.coin,
				parseFloat(node.lastReward.amount.amount) * amount
			);
		}
	}

	const serializedNodesValue = JSON.stringify(Array.from(nodesValue.entries()));
	const serializedNodesCoin = JSON.stringify(Array.from(nodesCoin.entries()));
	const data: Props = {
		nodes,
		serializedNodesValue,
		serializedNodesCoin,
	};

	cache.set(cacheKey, data);

	if (cacheKey === undefined) cache.set('USD', data);

	return {
		props: data,
	};
};

const HOME_PAGE_SECTIONS = [
	{
		darkBg: false,
		heading: 'MasterNode',
		subheading: 'Passive income by staking your crypto assets',
		imgSrc: Human.src,
		type: 'masthead',
	},
	{
		darkBg: false,
		heading: 'What is Staking?',
		subheading:
			'Staking is a process in which cryptocurrency holders volunteer to take part in validating transactions on the blockchain – in other words, checking that the ledger all adds up.',
		type: 'block',
	},
];

const Home: NextPage<Props> = ({
	nodes,
	serializedNodesValue,
	serializedNodesCoin,
}) => {
	const nodesValue: Map<string, number> = new Map(
		JSON.parse(serializedNodesValue)
	);
	const nodesCoin: Map<string, Coin> = new Map(JSON.parse(serializedNodesCoin));

	return (
		<>
			<Head>
				<title>Cake MasterNodes</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="min-h-screen flex flex-col">
				<AppBanner darkBg={true} />
				<div className="flex-grow">
					<MaxWidthContainer darkBg={false}>
						<div className="flex items-center my-5">
							<span className="font-semibold text-3xl mr-2">MasterNode</span>
							<img
								className="w-8 h-8"
								src={CakeDefiSymbol.src}
								alt="CakeDefi Symbol"
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
							{HOME_PAGE_SECTIONS.map(section => (
								<HomePageSection key={section.heading} {...section} />
							))}
						</div>

						<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
							<HomePageSection
								darkBg={false}
								heading="View All Nodes"
								subheading="Staking rewards for all nodes"
								type="smBlock"
							/>
							<Dropdown />
						</div>

						<div className="mt-5 mb-10">
							<h5 className="text-lg md:text-xl lg:text-2xl font-semibold mb-3 md:mb-5">
								Total Assets Under Management
							</h5>
							<div className="flex justify-center mb-10 md:mb-14 lg:mb-16">
								<TotalAssetsFigure
									nodesValue={nodesValue}
									nodes={nodes}
									coins={nodesCoin}
								/>
							</div>
							<div>
								<div className="grid grid-cols-3 place-items-center items-start gap-5 md:gap-8">
									{nodes.map(node => {
										let nodeValue;
										let coin;

										if (nodesValue.has(node.lastReward.amount.coin))
											nodeValue = nodesValue.get(node.lastReward.amount.coin);
										if (nodesCoin.has(node.coin))
											coin = nodesCoin.get(node.coin);

										if (
											typeof nodeValue === 'undefined' ||
											typeof coin === 'undefined'
										) {
											return null;
										}

										return (
											<TotalAssetsSection
												key={node.coin}
												nodesValue={nodesValue}
												node={node}
												coin={coin}
											/>
										);
									})}
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 mb-5">
							{nodes.map(node => {
								let nodeValue;
								let coin;

								if (nodesValue.has(node.lastReward.amount.coin))
									nodeValue = nodesValue.get(node.lastReward.amount.coin);
								if (nodesCoin.has(node.coin)) coin = nodesCoin.get(node.coin);

								if (
									typeof nodeValue === 'undefined' ||
									typeof coin === 'undefined'
								) {
									return null;
								}

								return (
									<NodeCardSection key={node.coin} node={node} coin={coin} />
								);
							})}
						</div>
					</MaxWidthContainer>
				</div>
				<AppFooter />
			</main>
		</>
	);
};

export default Home;
