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
			btc: number;
			eur: number;
			sgd: number;
			usd: number;
		};
		ath: {
			btc: number;
			eur: number;
			sgd: number;
			usd: number;
		};
		ath_change_percentage: {
			btc: number;
			eur: number;
			sgd: number;
			usd: number;
		};
		high_24h: {
			btc: number;
			eur: number;
			sgd: number;
			usd: number;
		};
		low_24h: {
			btc: number;
			eur: number;
			sgd: number;
			usd: number;
		};
		price_change_24h: number;
		price_change_percentage_24h: number;
		price_change_percentage_7d: number;
		price_change_percentage_14d: number;
		price_change_percentage_30d: number;
		price_change_percentage_60d: number;
		price_change_24h_in_currency: {
			btc: number;
			eur: number;
			sgd: number;
			usd: number;
		};
		price_change_percentage_1h_in_currency: {
			btc: number;
			eur: number;
			sgd: number;
			usd: number;
		};
		price_change_percentage_24h_in_currency: {
			btc: number;
			eur: number;
			sgd: number;
			usd: number;
		};
	};
	last_updated: string;
	image: {
		small: string;
		large: string;
	};
}
