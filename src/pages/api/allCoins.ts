import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import LRUCache from 'lru-cache';

const cache = new LRUCache<string, number>({
	max: 100,
	maxAge: 1000 * 60 * 60,
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const url = 'https://api.coingecko.com/api/v3/coins/list';

	const { method } = req;

	try {
		if (method === 'GET') {
			const cachedResponse = cache.get(url);
			if (cachedResponse) {
				res.status(200).json(cachedResponse);
				return;
			}

			const { data } = await axios.get(url);
			res.status(200).json(data);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}
