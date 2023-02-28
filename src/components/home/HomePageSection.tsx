import { FC } from 'react';

type Props = {
	darkBg?: boolean;
	heading?: string;
	subheading?: string;
	type: string;
};

const HomePageSection: FC<Props> = ({ darkBg, heading, subheading, type }) => {
	const bg = darkBg
		? 'bg-primary-700 text-neutral-100'
		: 'bg-neutral-100 text-primary-700';

	const renderSection = (type: string) => {
		switch (type) {
			case 'block': {
				return (
					<div className={`col-span-1 md:col-span-2 ${bg}`}>
						<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							{heading}
						</h5>
						<p className="font-normal text-gray-700 dark:text-gray-400">
							{subheading}
						</p>
					</div>
				);
			}

			case 'smBlock': {
				return (
					<div className={`col-span-1 ${bg}`}>
						<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							{heading}
						</h5>
						<p className="font-normal text-gray-700 dark:text-gray-400">
							{subheading}
						</p>
					</div>
				);
			}

			default: {
				return <></>;
			}
		}
	};

	return <>{renderSection(type)}</>;
};

export default HomePageSection;
