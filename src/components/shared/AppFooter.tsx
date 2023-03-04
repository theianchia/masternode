import MaxWidthContainer from './MaxWidthContainer';
import CakeDefi from 'public/cakedefi.png';

const AppFooter = () => {
	return (
		<footer className="p-4 bg-neutral-100 border-t-1 mt-5">
			<MaxWidthContainer darkBg={false}>
				<div className="sm:flex sm:items-center sm:justify-between mb-2 md:mb-4">
					<a href="https://cakedefi.com/" className="items-center mb-4 sm:mb-0">
						<span className="self-center text-3xl font-semibold whitespace-nowrap">
							MasterNode
						</span>
						<div className="flex items-center">
							<span className="text-sm mr-2">powered by</span>
							<img src={CakeDefi.src} className="h-4" alt="Flowbite Logo" />
						</div>
					</a>
					<ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0">
						<li>
							<a
								href="https://cakedefi.com/about-us"
								className="mr-4 hover:underline md:mr-6 "
							>
								About Us
							</a>
						</li>
						<li>
							<a
								href="https://cakedefi.com/privacy-policy"
								className="mr-4 hover:underline md:mr-6"
							>
								Privacy Policy
							</a>
						</li>
						<li>
							<a
								href="https://support.cakedefi.com/hc/en-us?_gl=1*1adqlrn*_ga*MTc3ODQ3ODk4LjE2NzcyNDY2MzY.*_ga_MXVFEDMPPL*MTY3NzY3OTMxMS42LjEuMTY3NzY4MDM3OS4wLjAuMA..*_fplc*ZmhyZG5INFhDUVlkUXZhN3VVZW1IckNTcSUyRlclMkJQUWtkV1RsQU81U2MlMkZkZnF5MDdwWjBQZzVNNUMlMkZLJTJGZiUyQmtaWDNGdGJZVTB0YTZGcExPJTJCRVhpVWtwRms3OEZ4ZVRHeW1iejVEMksycWtjSkdPaXhEJTJCRU1nSEhNelVxbDN3QSUzRCUzRA.."
								className="hover:underline"
							>
								FAQ
							</a>
						</li>
					</ul>
				</div>
				<hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
				<span className="block text-sm text-gray-500 sm:text-center">
					©{' '}
					<a href="https://flowbite.com/" className="hover:underline">
						MasterNode™
					</a>
					. All Rights Reserved.
				</span>
			</MaxWidthContainer>
		</footer>
	);
};

export default AppFooter;
