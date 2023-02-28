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
	};
	image: {
		small: string;
		large: string;
	};
}
