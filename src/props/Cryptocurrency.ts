export interface Cryptocurrency {
	id: string;
	name: string;
	symbol: string;
	slug: string;
	num_market_pairs: number;
	date_added: string;
	tags: string[];
	max_supply: number;
	circulating_supply: number;
	total_supply: number;
	cmc_rank: number;
	last_updated: string;
	quote: {
		USD: {
			price: number;
			volume_24h: number;
			percent_change_1h: number;
			percent_change_24h: number;
			percent_change_7d: number;
			market_cap: number;
			last_updated: string;
		};
	};
}
