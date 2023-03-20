import { FC } from 'react';

type Props = {
	selected: string;
	handleChartButtonClick: (type: string) => void;
};

type ButtonIconProps = {
	type: string;
};

const CHART_TYPES = ['Line', 'Bar'];

const ChartButtonIcon: FC<ButtonIconProps> = ({ type }) => {
	switch (type) {
		case 'Line': {
			return (
				<svg
					className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 mr-2"
					fill="none"
					stroke="currentColor"
					strokeWidth={1.5}
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
					/>
				</svg>
			);
		}

		case 'Bar': {
			return (
				<svg
					className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 mr-2"
					fill="none"
					stroke="currentColor"
					strokeWidth={1.5}
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
					/>
				</svg>
			);
		}

		default: {
			return <></>;
		}
	}
};

const ChartButtonGroup: FC<Props> = ({ selected, handleChartButtonClick }) => {
	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		console.log((e.target as HTMLInputElement).value);
		handleChartButtonClick((e.target as HTMLInputElement).value);
	};

	return (
		<div className="inline-flex rounded-md shadow-sm" role="group">
			{CHART_TYPES.map((type, index) => {
				return (
					<button
						key={index}
						type="button"
						value={type}
						onClick={handleClick}
						className={`
                ${
									selected == type
										? 'bg-primary-500 text-white border-primary-500 hover:bg-primary-700 hover:border-primary-700'
										: 'text-black hover:text-primary-500'
								} 
                ${index == 0 ? 'rounded-l-lg border' : ''}
                ${
									index == CHART_TYPES.length - 1
										? 'rounded-r-lg border-t border-b border-r'
										: ''
								}
                inline-flex items-center px-4 py-2 text-sm sm:text-base xl:text-lg font-medium border-black focus:z-10 focus:ring-primary-700`}
					>
						<ChartButtonIcon type={type} />
						{type}
					</button>
				);
			})}
		</div>
	);
};

export default ChartButtonGroup;
