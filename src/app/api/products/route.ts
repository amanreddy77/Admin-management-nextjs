import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('MONGO_URI is not defined');
}

const client = new MongoClient(mongoUri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db('your-database-name');
    const productsCollection = database.collection('products');
    const products = await productsCollection.find().toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  } finally {
    await client.close();
  }
}
