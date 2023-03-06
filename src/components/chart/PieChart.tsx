import { FC } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

type Props = {
	nodesValueInCurrency: Map<string, number>;
	currency: string;
};

const PieChart: FC<Props> = ({ nodesValueInCurrency, currency }) => {
	Chart.register(ArcElement, Tooltip, Legend);

	const chartData = {
		labels: Array.from(nodesValueInCurrency.keys()),
		datasets: [
			{
				label: `${currency} Value`,
				data: Array.from(nodesValueInCurrency.values()),
				backgroundColor: [
					'#4397AD',
					'#9687F7',
					'#489FF8',
					'#64D9F0',
					'#9E47F6',
					'#7578FF',
				],
				borderColor: '#f5f5f5',
				fontColor: '#000',
				borderWidth: 3,
				legend: {
					display: true,
					position: 'bottom',
					labels: {
						fontColor: '#000',
						fontSize: 14,
						padding: 20,
					},
				},
			},
		],
	};

	return (
		<div className="w-56 md:w-64 lg:w-72 xl:w-80">
			<Pie data={chartData} />
		</div>
	);
};

export default PieChart;
