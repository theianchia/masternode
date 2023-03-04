import { FC } from 'react';
import { Chart, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';

const AssetsPieChart: FC = () => {
	Chart.register(ArcElement);
	Chart.defaults.color = '#000';

	const Data = [
		{
			id: 1,
			year: 2016,
			userGain: 80000,
			userLost: 823,
		},
		{
			id: 2,
			year: 2017,
			userGain: 45677,
			userLost: 345,
		},
		{
			id: 3,
			year: 2018,
			userGain: 78888,
			userLost: 555,
		},
	];

	const chartData = {
		labels: Data.map(data => data.year),
		datasets: [
			{
				labels: ['ETH', 'DFI', 'DASH'],
				data: Data.map(data => data.userGain),
				backgroundColor: ['#9687F7', '#489FF8', '#64D9F0'],
				borderColor: 'white',
				borderWidth: 2,
			},
		],
	};

	return (
		<div className="w-56 md:w-64 lg:w-72 xl:w-80">
			<Pie data={chartData} />
		</div>
	);
};

export default AssetsPieChart;
