import { Footer } from 'flowbite-react';
import MaxWidthContainer from './MaxWidthContainer';

const AppFooter = () => {
	return (
		<Footer container={true} className="bg-neutral-100">
			<MaxWidthContainer darkBg={false}>
				<div className="w-full text-center">
					<div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
						<Footer.Brand
							href="https://flowbite.com"
							src="https://flowbite.com/docs/images/logo.svg"
							alt="MasterNodes Logo"
							name="MasterNodes™"
						/>
						<Footer.LinkGroup>
							<Footer.Link href="#">About</Footer.Link>
							<Footer.Link href="#">Privacy Policy</Footer.Link>
							<Footer.Link href="#">Licensing</Footer.Link>
							<Footer.Link href="#">Contact</Footer.Link>
						</Footer.LinkGroup>
					</div>
					<Footer.Divider />
					<Footer.Copyright href="#" by="MasterNodes™" year={2022} />
				</div>
			</MaxWidthContainer>
		</Footer>
	);
};

export default AppFooter;
