import { FC } from 'react';

type Props = {
	darkBg?: boolean;
	heading?: string;
	subheading?: string;
	imgSrc?: string;
	type: string;
};

const HomePageSection: FC<Props> = ({
	darkBg,
	heading,
	subheading,
	imgSrc,
	type,
}) => {
	const bg = darkBg
		? 'bg-primary-700 text-neutral-100'
		: 'bg-neutral-100 text-primary-700';

	const renderSection = (type: string) => {
		switch (type) {
			case 'block': {
				return (
					<div className={`col-span-1 md:col-span-2 ${bg}`}>
						<div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between lg:justify-around">
							<div>
								<h5 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 md:mb-2">
									{heading}
								</h5>
								<p className="text-lg md:text-xl lg:text-2xl font-normal text-gray-700 dark:text-gray-400">
									{subheading}
								</p>
							</div>
							<div className="my-3 md:my-4">
								<img
									className="h-60 md:h-72 lg:h-80"
									src={imgSrc}
									alt="image"
								/>
							</div>
						</div>
					</div>
				);
			}

			case 'smBlock': {
				return (
					<div className={`col-span-1 ${bg}`}>
						<h5 className="text-xl md:text-2xl lg:text-3xl md:mb-2 font-bold tracking-tight text-gray-900">
							{heading}
						</h5>
						<p className="text-md md:text-lg lg:text-xl font-normal text-gray-700">
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
