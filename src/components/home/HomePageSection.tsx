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
	const bg = darkBg ? 'bg-primary-700 text-neutral-100' : 'bg-neutral-100';

	const renderSection = (type: string) => {
		switch (type) {
			case 'masthead': {
				return (
					<div className={`col-span-1 md:col-span-2 my-5 ${bg}`}>
						<div className="flex flex-row items-center md:text-end justify-between md:justify-around">
							<div>
								<h5 className="text-3xl md:text-4xl lg:text-5xl font-semibold md:mb-2">
									{heading}
								</h5>
								<p className="text-md md:text-lg lg:text-xl italic text-gray-700">
									{subheading}
								</p>
							</div>
							<div className="my-3 md:my-4">
								{imgSrc !== undefined ? (
									<img
										className="w-auto max-h-72 sm:max-h-none sm:h-72 md:h-80 lg:h-96"
										src={imgSrc}
										alt="image"
									/>
								) : null}
							</div>
						</div>
					</div>
				);
			}

			case 'block': {
				return (
					<div
						className={`col-span-1 md:col-span-2 mb-16 md:mb-20 lg:mb-24 ${bg}`}
					>
						<div className="flex flex-row items-center justify-between">
							<div>
								<h5 className="text-2xl md:text-3xl lg:text-4xl font-semibold md:mb-2">
									{heading}
								</h5>
								<p className="text-md md:text-lg lg:text-xl hover:italic text-gray-700 transition ease-in-out delay-150 duration-300">
									{subheading}
								</p>
							</div>
							<div className="my-3 md:my-4">
								{imgSrc !== undefined ? (
									<img
										className="w-auto max-h-72 sm:max-h-none sm:h-72 md:h-80 lg:h-96"
										src={imgSrc}
										alt="image"
									/>
								) : null}
							</div>
						</div>
					</div>
				);
			}

			case 'smBlock': {
				return (
					<div className={`col-span-1 ${bg}`}>
						<h5 className="text-2xl md:text-3xl lg:text-4xl font-semibold md:mb-2">
							{heading}
						</h5>
						<p className="text-md md:text-lg lg:text-xl text-gray-700">
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
