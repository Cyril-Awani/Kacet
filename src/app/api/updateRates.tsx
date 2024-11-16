import { MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

interface RatesData {
	deriv: string;
	cryptocurrency: string;
	giftcards: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	// Only allow PUT requests
	if (req.method !== 'PUT') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const { deriv, cryptocurrency, giftcards }: RatesData = req.body;

	// Validate input
	if (!deriv || !cryptocurrency || !giftcards) {
		return res.status(400).json({ message: 'Invalid data provided' });
	}

	const uri = process.env.MONGODB_URI as string;
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	try {
		await client.connect();
		const db = client.db('Cluster1'); // Replace with your database name
		const ratesCollection = db.collection('rates'); // Collection to store rates

		// Upsert rates using ObjectId for the _id field
		const result = await ratesCollection.updateOne(
			{ _id: new ObjectId('defaultRates') }, // Convert string to ObjectId
			{
				$set: {
					deriv,
					cryptocurrency,
					giftcards,
					updatedAt: new Date(),
				},
			},
			{ upsert: true }, // Create the document if it doesn't exist
		);

		res.status(200).json({ message: 'Rates updated successfully', result });
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		res.status(500).json({ message: 'Internal server error' });
	} finally {
		await client.close();
	}
};

export default handler;
