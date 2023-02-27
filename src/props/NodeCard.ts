export interface NodeCard {
	coin: string;
	lastRewardValue: {
		createdAt: string;
		amount: {
			coin: string;
			kind: string;
			amount: string;
		};
	};
	value: number;
}
