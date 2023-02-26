import { FC } from 'react';
import MaxWidthContainer from './MaxWidthContainer';

type Props = {
	darkBg?: boolean;
};

const AppBanner: FC<Props> = ({ darkBg }) => {
	const bg = darkBg ? 'bg-blue-500' : 'white';

	return (
		<div className={`py-1 ${bg}`}>
			<MaxWidthContainer darkBg={false}>
				Nodes is a work in progress assignment for Cake DeFi
			</MaxWidthContainer>
		</div>
	);
};

export default AppBanner;
