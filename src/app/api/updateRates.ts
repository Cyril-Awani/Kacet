import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const uri: string | undefined = process.env.MONGODB_URI;

  if (!uri) {
    return res.status(500).json({ message: 'MONGODB_URI is not defined in environment variables' });
  }

  // Create a MongoDB client
  const client = new MongoClient(uri);

  try {
    // Connect to the database
    await client.connect();

    // Get the database and collection
    const db = client.db('ratesDB'); // Your database name
    const collection = db.collection('ratesCollection'); // Your collection name

    // Fetch the rates data from MongoDB
    const rates = await collection.findOne({}); // Adjust your query as needed

    if (rates) {
      res.status(200).json(rates); // Send the rates data as a JSON response
    } else {
      res.status(404).json({ message: 'Rates data not found' });
    }
  } catch (error: unknown) {
    // Safely handle the unknown error type
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ message: 'Failed to fetch rates', error: errorMessage });
  } finally {
    await client.close(); // Close the database connection
  }
};

export default handler;
