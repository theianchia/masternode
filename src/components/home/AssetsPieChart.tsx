import { FC } from 'react';
import { Chart, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';

type Props = {
	nodesValueInCurrency: Map<string, number>;
};

const AssetsPieChart: FC<Props> = ({ nodesValueInCurrency }) => {
	Chart.register(ArcElement);

	const chartData = {
		labels: Array.from(nodesValueInCurrency.keys()),
		datasets: [
			{
				labels: 'Dataset 1',
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
				borderWidth: 3,
			}
		],
	};

	return (
		<div className="w-56 md:w-64 lg:w-72 xl:w-80">
			<Pie data={chartData} />
		</div>
	);
};

export default AssetsPieChart;
