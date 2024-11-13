'use client';
import React, { useState, useEffect } from 'react';

interface CoinApiResponse {
	symbol: string;
	name: string;
	current_price: number;
	price_change_percentage_24h: number;
	price_change_percentage_7d_in_currency: number | null; // Can be null if not available
	total_volume: number;
	market_cap: number;
	sparkline_in_7d: {
		price: number[]; // Array of prices for the sparkline (7-day chart)
	};
}

interface CoinData {
	symbol: string;
	name: string;
	price: string;
	change_24h: string;
	change_7d: string;
	volume: string;
	marketCap: string;
	sparkline: number[];
}

const SpecificCoinsTable = () => {
	const [coinsData, setCoinsData] = useState<CoinData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch data for specific coins
	const fetchSpecificCoins = async () => {
		try {
			const coinIds = [
				'bitcoin',
				'ethereum',
				'tether',
				'solana',
				'binancecoin',
				'dogecoin',
				'shiba-inu',
			];
			const response = await fetch(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(
					',',
				)}&sparkline=true`,
			);
			const data = await response.json();

			// Process data to get relevant fields for the table
			const coins = data.map((coin: CoinApiResponse) => ({
				symbol: coin.symbol.toUpperCase(),
				name: coin.name,
				price: coin.current_price.toFixed(2),
				change_24h: coin.price_change_percentage_24h.toFixed(1),
				change_7d:
					coin.price_change_percentage_7d_in_currency?.toFixed(1) || 'N/A',
				volume: coin.total_volume.toLocaleString(),
				marketCap: coin.market_cap.toLocaleString(),
				sparkline: coin.sparkline_in_7d.price, // 7-day price chart data
			}));

			setCoinsData(coins);
		} catch (error) {
			console.error('Error fetching data:', error);
			setError('Failed to fetch data');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSpecificCoins();
	}, []);

	if (loading) return <p>Loading data...</p>;
	if (error) return <p>{error}</p>;

	return (
		<section className='py-5'>
			<h2 className='text-xl text-gray-900 font-bold mb-5 text-center'>
				🚀 MyTop
			</h2>
			<div className='overflow-x-auto flex justify-center'>
				<div className='max-w-7xl w-full'>
					<table className='min-w-full text-xs text-gray-950 px-5 mx-5 bg-white border border-gray-200'>
						<thead className='bg-gray-50'>
							<tr>
								<th className='px-4 py-2 border'>#</th>
								<th className='px-4 py-2 border sticky left-0 bg-white'>
									Coin
								</th>
								<th className='px-4 py-2 border text-right'>Price</th>
								<th className='px-4 py-2 border text-right'>24h</th>
								<th className='px-4 py-2 border text-right'>24h Volume</th>
								<th className='px-4 py-2 border text-right'>Market Cap</th>
								<th className='px-4 py-2 border'>Last 7 Days</th>
							</tr>
						</thead>
						<tbody>
							{coinsData.map((coin, index) => (
								<tr key={index} className='text-center'>
									<td className='px-4 py-2 sticky left-0 border'>
										{index + 1}
									</td>
									<td className='px-4 py-2 sticky left-0 bg-white'>
										{coin.name} ({coin.symbol})
									</td>
									<td className='px-4 py-2 text-right'>${coin.price}</td>

									<td
										className={`px-4 py-2 text-right ${
											parseFloat(coin.change_24h) >= 0
												? 'text-green-500'
												: 'text-red-500'
										}`}>
										{coin.change_24h}%
									</td>

									<td className='px-4 py-2 text-right'>${coin.volume}</td>
									<td className='px-4 py-2 text-right'>${coin.marketCap}</td>
									<td className='px-4 py-2 w-12 text-right'>
										{/* Display sparkline (7-day chart) */}
										<div className='w-24 h-8 relative right-0'>
											<svg
												width='100%'
												height='100%'
												viewBox='0 0 100 40'
												preserveAspectRatio='none'>
												{/* Gradient for the area under the line */}
												<defs>
													<linearGradient
														id='sparkline-gradient'
														x1='0'
														y1='0'
														x2='0'
														y2='1'>
														<stop
															offset='0%'
															stopColor='#4CAF50'
															stopOpacity='0.4'
														/>
														<stop
															offset='100%'
															stopColor='#4CAF50'
															stopOpacity='0'
														/>
													</linearGradient>
												</defs>

												{/* Area under the line */}
												<path
													d={`M 0,${
														40 -
														(coin.sparkline[0] / Math.max(...coin.sparkline)) *
															40
													} 
              ${coin.sparkline
								.map(
									(price, i) =>
										`L ${(i * 100) / (coin.sparkline.length - 1)},${
											40 - (price / Math.max(...coin.sparkline)) * 40
										}`,
								)
								.join(' ')} 
              L 100,40 L 0,40 Z`}
													fill='url(#sparkline-gradient)'
												/>

												{/* Smoothed line chart */}
												<path
													d={`M 0,${
														40 -
														(coin.sparkline[0] / Math.max(...coin.sparkline)) *
															40
													} 
              ${coin.sparkline
								.map(
									(price, i) =>
										`L ${(i * 100) / (coin.sparkline.length - 1)},${
											40 - (price / Math.max(...coin.sparkline)) * 40
										}`,
								)
								.join(' ')}`}
													fill='none'
													stroke='#4CAF50'
													strokeWidth='2'
													strokeLinejoin='round'
													strokeLinecap='round'
												/>
											</svg>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default SpecificCoinsTable;
