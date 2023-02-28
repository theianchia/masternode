import { useState } from 'react';
import { useRouter } from 'next/router';

const Dropdown = () => {
	const CURRENCIES = ['USD', 'EUR', 'SGD', 'BTC'];
	const [currency, setCurrency] = useState('USD');
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCurrency(e.target.value);
		router.push(`?currency=${e.target.value}`);
	};

	return (
		<div>
			<label htmlFor="currency" className="block mb-2 text-sm font-medium">
				Select a Currency
			</label>
			<select
				id="currency"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-700 block w-full p-2.5"
				value={currency}
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
