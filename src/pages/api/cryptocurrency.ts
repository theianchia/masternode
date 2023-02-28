import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const url =
		'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
	const config = {
		headers: {
			'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY as string,
		},
	};
	const { method } = req;

	try {
		if ( method === 'GET' ) {
      const { data } = await axios.get(url, config);
      res.status(200).json(data);
    }

	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}
