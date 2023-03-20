import { FC } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

type Props = {
	nodesValueInCurrency: Map<string, number>;
	currency: string;
};

const PieChart: FC<Props> = ({ nodesValueInCurrency, currency }) => {
	Chart.register(ArcElement, Tooltip, Legend);

	const options = {
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: 'Proportion of Assets in Value',
			},
		},
	};

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
		<div className="flex w-72 md:w-80 lg:w-96 h-72 md:h-80 lg:h-96">
			<Pie data={chartData} options={options} />
		</div>
	);
};

export default PieChart;
