import { FC } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Coin } from '@/props/Coin';

type Props = {
	coin: Coin;
};

const LINEAXISLABELS = ['1d', '7d', '14d', '30d', '60d'];

const PriceChangePercentageLineChart: FC<Props> = ({ coin }) => {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);

	const data = [
		coin.market_data.price_change_percentage_24h,
		coin.market_data.price_change_percentage_7d,
		coin.market_data.price_change_percentage_14d,
		coin.market_data.price_change_percentage_30d,
		coin.market_data.price_change_percentage_60d,
	];

	const chartData = {
		labels: LINEAXISLABELS,
		datasets: [
			{
				label: 'Percentage Change in Price',
				data: data,
				borderColor: '#9E47F6',
				borderWidth: 2,
				fill: false,
			},
			{
				label: 'Baseline',
				borderDash: [15, 5],
				data: [0, 0, 0, 0, 0],
			},
		],
	};

	return (
		<div className="w-64 md:w-72 lg:w-80 xl:w-96">
			<Line data={chartData} />
		</div>
	);
};

export default PriceChangePercentageLineChart;
