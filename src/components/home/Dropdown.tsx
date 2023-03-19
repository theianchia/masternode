import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Dropdown = () => {
	const CURRENCIES = ['USD', 'EUR', 'SGD', 'BTC'];
	const [currencyKey, setCurrencyKey] = useState('USD');
	const router = useRouter();
	const currency = router.query.currency as string;

	useEffect(() => {
		if (currency !== undefined && CURRENCIES.includes(currency)) {
			setCurrencyKey(currency);
		}
	}, [router.query]);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCurrencyKey(e.target.value);
		router.push(`?currency=${e.target.value}`, null, { shallow: true });
	};

	return (
		<div className="my-5">
			<label
				htmlFor="currency"
				className="block mb-2 text-sm md:text-md lg:texl-lg font-medium"
			>
				Select a Currency
			</label>
			<select
				id="currency"
				className="bg-gray-50 border border-gray-300 text-sm md:text-md lg:texl-lg rounded-lg focus:ring-primary-700 block w-full p-2.5"
				value={currencyKey}
				onChange={handleChange}
			>
				{CURRENCIES.map(currency => {
					return (
						<option key={currency} value={currency}>
							{currency}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default Dropdown;
