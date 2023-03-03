import { FC, useState } from 'react';
import MaxWidthContainer from './MaxWidthContainer';

type Props = {
	darkBg?: boolean;
};

const AppBanner: FC<Props> = ({ darkBg }) => {
	const bg = darkBg
		? 'bg-primary-700 text-neutral-100'
		: 'bg-neutral-100 text-primary-700';
	const [showBanner, setShowBanner] = useState(true);

	const handleClick = () => {
		setShowBanner(false);
	};

	if (!showBanner) return null;

	return (
		<div className={`py-1 ${bg} mb-5`}>
			<MaxWidthContainer darkBg={darkBg}>
				<div className="flex justify-between">
					<div className="flex">
						<svg
							className="w-6 h-6 mr-1"
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
								d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
							/>
						</svg>
						MasterNodes is a work in progress assignment for Cake DeFi
					</div>

					<div onClick={handleClick}>
						<svg
							className="w-6 h-6"
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
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</div>
				</div>
			</MaxWidthContainer>
		</div>
	);
};

export default AppBanner;
