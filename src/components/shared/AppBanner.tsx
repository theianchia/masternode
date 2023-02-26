import { FC } from 'react';
import MaxWidthContainer from './MaxWidthContainer';

type Props = {
	darkBg?: boolean;
};

const AppBanner: FC<Props> = ({ darkBg }) => {
	const bg = darkBg
		? 'bg-primary-700 text-neutral-100'
		: 'bg-neutral-100 text-primary-700';

	return (
		<div className={`py-1 ${bg}`}>
			<MaxWidthContainer darkBg={darkBg}>
				MasterNodes is a work in progress assignment for Cake DeFi
			</MaxWidthContainer>
		</div>
	);
};

export default AppBanner;
