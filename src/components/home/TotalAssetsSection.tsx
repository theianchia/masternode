import { FC } from 'react';

type Props = {
	nodesValue: Map<string, number>;
};

const TotalAssetsSection: FC<Props> = ({ nodesValue }) => {
	return (
		<>
			<h5 className="text-lg md:text-xl lg:text-2xl font-semibold mb-3 md:mb-5">
				Total Assets Under Management
			</h5>
			<div className="flex justify-around">
				{Array.from(nodesValue).map(([key, value]) => (
					<div key={key} className="text-lg md:text-xl lg:text-2xl">
						<p>{key}</p>
						<hr className="h-0.5 border-0 bg-black my-1 md:my-2 lg:my-3" />
						<p className="font-bold text-sm md:text-md lg:text-xl">
							{value.toFixed(3)} {key}
						</p>
					</div>
				))}
			</div>
		</>
	);
};

export default TotalAssetsSection;
