export interface Coin {
	id: string;
	name: string;
	symbol: string;
	description: {
		en: string;
	};
	country_origin: string;
	sentiment_votes_up_percentage: number;
	sentiment_votes_down_percentage: number;
	market_cap_rank: number;
	coingecko_rank: number;
	market_data: {
		current_price: {
			[key: string]: number;
		};
		ath: {
			[key: string]: number;
		};
		ath_change_percentage: {
			[key: string]: number;
		};
		high_24h: {
			[key: string]: number;
		};
		low_24h: {
			[key: string]: number;
		};
		price_change_percentage_24h: number;
		price_change_percentage_7d: number;
		price_change_percentage_14d: number;
		price_change_percentage_30d: number;
		price_change_percentage_60d: number;
		price_change_24h_in_currency: {
			[key: string]: number;
		};
		price_change_percentage_1h_in_currency: {
			[key: string]: number;
		};
		price_change_percentage_24h_in_currency: {
			[key: string]: number;
		};
	};
	last_updated: string;
	image: {
		small: string;
		large: string;
	};
}
