import AppBanner from '@/components/shared/AppBanner';
import MaxWidthContainer from '@/components/shared/MaxWidthContainer';
import HomePageSection from '@/components/home/HomePageSection';
import AppFooter from '@/components/shared/AppFooter';
import { Node } from '@/props/Node';
import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';

type Props = {
  nodesToday: Node[];
  serializedNodesAmount: string;
  serializedNodesCurrency: string;
}

export const getStaticProps:GetStaticProps<Props> = async () => {
  const res = await fetch('https://api.cakedefi.com/nodes?order=status&orderBy=DESC')
  const nodes:Node[] = await res.json()

  const currentDate = new Date();

  const nodesToday:Node[] = [];
  const nodesAmount = new Map<string, number>();
  const nodesCurrency = new Map<string, string>();

  for (const node of nodes) {
    const createdDate = new Date(node.lastReward.createdAt);
    if (currentDate.toDateString() === createdDate.toDateString()) {
      nodesToday.push(node);

      if (nodesAmount.has(node.coin)) {
        const currAmount = nodesAmount.get(node.coin);
        if (typeof currAmount === "number") {
          nodesAmount.set(node.coin, currAmount + parseFloat(node.lastReward.amount.amount));
        }
      } else {
        nodesAmount.set(node.coin, parseFloat(node.lastReward.amount.amount));
      }

      nodesCurrency.set(node.coin, node.lastReward.amount.coin);

    } else {
      break
    }
  }

  const serializedNodesAmount = JSON.stringify(Array.from(nodesAmount.entries()));
  const serializedNodesCurrency = JSON.stringify(Array.from(nodesCurrency.entries()));

  return {
    props: {
      nodesToday,
      serializedNodesAmount,
      serializedNodesCurrency,
    },
    revalidate: 60,
  }
}

const HOME_PAGE_SECTIONS = [
  {
    darkBg: false,
    heading: 'Cake Nodes',
    subheading: 'Earn passive income by staking your crypto assets',
    type: 'block',
  },
  {
    darkBg: false,
    heading: 'Ether',
    subheading: 'Earn passive income by staking your crypto assets',
    type: 'card',
  },
  {
    darkBg: false,
    heading: 'DeFi',
    subheading: 'Earn passive income by staking your crypto assets',
    type: 'card',
  },
];

const Home: NextPage<Props> = ({ serializedNodesAmount, serializedNodesCurrency }) => {

  const nodesAmount: Map<string, number> = new Map(JSON.parse(serializedNodesAmount));
  const nodesCurrency: Map<string, string> = new Map(JSON.parse(serializedNodesCurrency));

  return (
    <>
      <Head>
        <title>Cake MasterNodes</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='min-h-screen flex flex-col'>
        <AppBanner darkBg={true} />
        <MaxWidthContainer darkBg={false}>
          <div className="grid grid-cols-2 gap-5">
            {
              HOME_PAGE_SECTIONS.map((section) => (
                <HomePageSection 
                  key={section.heading} 
                  nodeAmount={nodesAmount.get(section.heading)} 
                  nodeCurrency={nodesCurrency.get(section.heading)} 
                  {...section} 
                />
              ))
            }
          </div>
        </MaxWidthContainer>
        <AppFooter />
      </main>
    </>
  )
}

export default Home;
