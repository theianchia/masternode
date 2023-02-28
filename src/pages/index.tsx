import AppBanner from '@/components/shared/AppBanner';
import MaxWidthContainer from '@/components/shared/MaxWidthContainer';
import HomePageSection from '@/components/home/HomePageSection';
import AppFooter from '@/components/shared/AppFooter';
import { Node } from '@/props/Node';
import { Coin } from '@/props/Coin';
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import NodeCardSection from '@/components/home/NodeCardSection';

type Props = {
	nodes: Node[];
	serializedNodesValue: string;
	serializedNodesCoin: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
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

		if (nodesValue.has(node.coin)) {
			const currValue = nodesValue.get(node.coin);
			if (typeof currValue === 'number') {
				nodesValue.set(
					node.coin,
					currValue + parseFloat(node.lastReward.amount.amount)
				);
			}
		} else {
			nodes.push(node);
			nodesValue.set(node.coin, 0);
			nodesValue.set(node.coin, parseFloat(node.lastReward.amount.amount));

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

			if (coinId === '') {
				continue;
			}

			const coinResponse = await axios.get(
				`${process.env.API_BASE_URL}/coin?id=${coinId}`
			);
			const coinData = coinResponse.data;
			nodesCoin.set(node.coin, coinData);
		}
	}

	const serializedNodesValue = JSON.stringify(Array.from(nodesValue.entries()));

	const serializedNodesCoin = JSON.stringify(Array.from(nodesCoin.entries()));

	return {
		props: {
			nodes,
			serializedNodesValue,
			serializedNodesCoin,
		},
	};
};

const HOME_PAGE_SECTIONS = [
	{
		darkBg: false,
		heading: 'MasterNodes',
		subheading: 'Earn passive income by staking your crypto assets',
		type: 'block',
	},
	{
		darkBg: false,
		heading: 'Staking',
		subheading: 'Earn passive income by staking your crypto assets',
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
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							{HOME_PAGE_SECTIONS.map(section => (
								<HomePageSection key={section.heading} {...section} />
							))}
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							{nodes.map(node => {
								let nodeValue;
								let coin;

								if (nodesValue.has(node.coin)) {
									nodeValue = nodesValue.get(node.coin);
								}
								if (nodesCoin.has(node.coin)) {
									coin = nodesCoin.get(node.coin);
								}

								if (
									typeof nodeValue === 'undefined' ||
									typeof coin === 'undefined'
								) {
									return null;
								}

								return (
									<NodeCardSection
										key={node.coin}
										node={node}
										nodeValue={nodeValue}
										coin={coin}
									/>
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
