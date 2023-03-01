import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import LRUCache from 'lru-cache';

const cache = new LRUCache<string, number>({
	max: 100,
	maxAge: 1000 * 60 * 60, // 1 hour
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method, query } = req;
	const { id } = query || {};

	const url = `https://api.coingecko.com/api/v3/coins/${id}`;

	try {
		if (method === 'GET') {
			const cachedResponse = cache.get(url);
			if (cachedResponse) {
				res.status(200).json(cachedResponse);
				return;
			}

			const { data } = await axios.get(url);
			cache.set(url, data);
			res.status(200).json(data);
		}
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
}
