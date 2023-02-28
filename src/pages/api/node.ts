import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const url = 'https://api.cakedefi.com/nodes?order=status&orderBy=DESC';
  const { method } = req;

	try {
    if ( method === 'GET' ) {
      const { data } = await axios.get(url);
      res.status(200).json(data);
    }
		
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}
