export interface Node {
	id: string;
	coin: string;
	address: string;
	status: string;
	type: string;
	lastReward: {
    createdAt: string;
    amount: {
      coin: string;
      kind: string;
      amount: string;
    };
  };
}
