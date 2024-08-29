import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (req.method === 'GET' && typeof id === 'string') {
    try {
      await client.connect();
      const database = client.db('your-database-name');
      const product = await database.collection('products').findOne({ _id: new MongoClient.ObjectId(id) });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product' });
    } finally {
      await client.close();
    }
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
}
