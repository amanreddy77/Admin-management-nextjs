import { uploadImage } from './firebase'; 
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('your-database-name');

export const fetchProduct = async (id: string) => {
  const product = await db.collection('products').findOne({ _id: new MongoClient.ObjectId(id) });
  return product;
};

export const updateProduct = async (id: string, data: any) => {
  await db.collection('products').updateOne(
    { _id: new MongoClient.ObjectId(id) },
    { $set: data }
  );
};

export const submitForReview = async (productId: string, data: any) => {
  await db.collection('review_requests').insertOne({ productId, ...data });
};
