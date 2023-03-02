import { FC } from 'react';

type Props = {
	nodesValue: Map<string, number>;
};

const TotalAssetsSection: FC<Props> = ({ nodesValue }) => {
	return (
		<>
			<h5 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-5">
				Total Assets Under Management
			</h5>
			<div className="flex justify-around">
				{Array.from(nodesValue).map(([key, value]) => (
					<div key={key} className=" text-lg md:text-xl lg:text-2xl">
						<p>{key}</p>
						<hr className="h-0.5 border-0 bg-black my-2 md:my-3" />
						<p className="font-bold">{value} </p>
					</div>
				))}
			</div>
		</>
	);
};

export default TotalAssetsSection;