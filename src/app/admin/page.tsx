'use client'; // Mark this as a client-side component

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Admin = () => {
	const router = useRouter();

	// State variables for login and rate updates
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);

	const [derivDeposit, setDerivDeposit] = useState('');
	const [derivWithdrawal, setDerivWithdrawal] = useState('');
	const [bitcoinBuy, setBitcoinBuy] = useState('');
	const [bitcoinSell, setBitcoinSell] = useState('');
	const [ethereumBuy, setEthereumBuy] = useState('');
	const [ethereumSell, setEthereumSell] = useState('');
	const [usdtBuy, setUsdtBuy] = useState('');
	const [usdtSell, setUsdtSell] = useState('');
	const [giftCardAmazon25, setGiftCardAmazon25] = useState('');
	const [giftCardAmazon50, setGiftCardAmazon50] = useState('');
	const [giftCardAmazon100, setGiftCardAmazon100] = useState('');

	// Handle login functionality
	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		// Replace with your own authentication logic or API call
		if (username === 'admin' && password === 'admin123') {
			setLoggedIn(true);
		} else {
			alert('Invalid credentials!');
		}
	};

	// Handle logout functionality
	const handleLogout = () => {
		setLoggedIn(false);
	};

	// Handle rate update submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate inputs: check if all fields are numeric
		if (
			isNaN(Number(derivDeposit)) ||
			isNaN(Number(derivWithdrawal)) ||
			isNaN(Number(bitcoinBuy)) ||
			isNaN(Number(bitcoinSell)) ||
			isNaN(Number(ethereumBuy)) ||
			isNaN(Number(ethereumSell)) ||
			isNaN(Number(usdtBuy)) ||
			isNaN(Number(usdtSell)) ||
			isNaN(Number(giftCardAmazon25)) ||
			isNaN(Number(giftCardAmazon50)) ||
			isNaN(Number(giftCardAmazon100))
		) {
			alert('Please enter valid numeric values for all rates.');
			return;
		}

		try {
			const response = await axios.put('/api/updateRates', {
				deriv: {
					deposit: parseFloat(derivDeposit),
					withdrawal: parseFloat(derivWithdrawal),
				},
				cryptocurrency: {
					Bitcoin: {
						buy: parseFloat(bitcoinBuy),
						sell: parseFloat(bitcoinSell),
					},
					Ethereum: {
						buy: parseFloat(ethereumBuy),
						sell: parseFloat(ethereumSell),
					},
					USDT: {
						buy: parseFloat(usdtBuy),
						sell: parseFloat(usdtSell),
					},
				},
				giftcards: {
					'Amazon $25': parseFloat(giftCardAmazon25),
					'Amazon $50': parseFloat(giftCardAmazon50),
					'Amazon $100': parseFloat(giftCardAmazon100),
				},
			});

			if (response.status === 200) {
				router.push('/'); // Redirect to homepage after successful update
			}
		} catch (error) {
			console.error('Error updating rates:', error);
			alert('Failed to update rates. Please try again.');
		}
	};

	// Render login form if the user is not logged in
	if (!loggedIn) {
		return (
			<div className='max-w-md mx-auto mt-10'>
				<h2 className='text-center text-2xl font-bold mb-6'>Admin Login</h2>
				<form onSubmit={handleLogin} className='space-y-4'>
					<div>
						<label className='block'>Username</label>
						<input
							type='text'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className='w-full border rounded px-3 py-2'
							placeholder='Enter your username'
							required
						/>
					</div>
					<div>
						<label className='block'>Password</label>
						<input
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='w-full border rounded px-3 py-2'
							placeholder='Enter your password'
							required
						/>
					</div>
					<button
						type='submit'
						className='w-full py-2 bg-blue-500 text-white rounded'>
						Login
					</button>
				</form>
			</div>
		);
	}

	// Render the rate update form if the user is logged in
	return (
		<div className='max-w-md mx-auto mt-10'>
			<h2 className='text-center text-2xl font-bold mb-6'>Update Rates</h2>
			<form onSubmit={handleSubmit} className='space-y-4'>
				{/* Deriv Rates */}
				<div className='flex justify-between'>
					<label className='w-1/2'>Deriv Deposit Rate</label>
					<input
						type='number'
						value={derivDeposit}
						onChange={(e) => setDerivDeposit(e.target.value)}
						className='w-1/2 border rounded px-3 py-2'
						placeholder='Deposit rate'
					/>
				</div>
				<div className='flex justify-between'>
					<label className='w-1/2'>Deriv Withdrawal Rate</label>
					<input
						type='number'
						value={derivWithdrawal}
						onChange={(e) => setDerivWithdrawal(e.target.value)}
						className='w-1/2 border rounded px-3 py-2'
						placeholder='Withdrawal rate'
					/>
				</div>

				{/* Cryptocurrency Rates */}
				<div className='flex justify-between'>
					<label className='w-1/2'>Bitcoin Buy Rate</label>
					<input
						type='number'
						value={bitcoinBuy}
						onChange={(e) => setBitcoinBuy(e.target.value)}
						className='w-1/2 border rounded px-3 py-2'
						placeholder='Bitcoin buy rate'
					/>
				</div>
				<div className='flex justify-between'>
					<label className='w-1/2'>Bitcoin Sell Rate</label>
					<input
						type='number'
						value={bitcoinSell}
						onChange={(e) => setBitcoinSell(e.target.value)}
						className='w-1/2 border rounded px-3 py-2'
						placeholder='Bitcoin sell rate'
					/>
				</div>

				{/* Add Ethereum and USDT similarly */}
				<div className='flex justify-between'>
					<label className='w-1/2'>Ethereum Buy Rate</label>
					<input
						type='number'
						value={ethereumBuy}
						onChange={(e) => setEthereumBuy(e.target.value)}
						className='w-1/2 border rounded px-3 py-2'
						placeholder='Ethereum buy rate'
					/>
				</div>
				<div className='flex justify-between'>
					<label className='w-1/2'>Ethereum Sell Rate</label>
					<input
						type='number'
						value={ethereumSell}
						onChange={(e) => setEthereumSell(e.target.value)}
						className='w-1/2 border rounded px-3 py-2'
						placeholder='Ethereum sell rate'
					/>
				</div>
				<div className='flex justify-between'>
					<label className='w-1/2'>USDT Buy Rate</label>
					<input
						type='number'
						value={usdtBuy}
						onChange={(e) => setUsdtBuy(e.target.value)}
						className='w-1/2 border rounded px-3 py-2'
						placeholder='Ethereum buy rate'
					/>
				</div>
				<div className='flex justify-between'>
					<label className='w-1/2'>USDT Sell Rate</label>
					<input
						type='number'
						value={usdtSell}
						onChange={(e) => setUsdtSell(e.target.value)}
						className='w-1/2 border rounded px-3 py-2'
						placeholder='Ethereum sell rate'
					/>
				</div>

				{/* Add Giftcard Rates */}
				<div className='flex justify-between'>
					<label className='w-1/2'>Amazon $25 Giftcard Rate</label>
					<input
						type='number'
						value={giftCardAmazon25}
						onChange={(e) => setGiftCardAmazon25(e.target.value)}
						className='w-1/2 border rounded px-3 py-2'
						placeholder='Giftcard $25 rate'
					/>
				</div>
				<div className='flex justify-between'>
					<label className='w-1/2'>Amazon $50 Giftcard Rate</label>
					<input
						type='number'
						value={giftCardAmazon50}
						onChange={(e) => setGiftCardAmazon50(e.target.value)}
						className='w-1/2 border rounded px-3 py-2'
						placeholder='Giftcard $50 rate'
					/>
				</div>
				<div className='flex justify-between'>
					<label className='w-1/2'>Amazon $100 Giftcard Rate</label>
					<input
						type='number'
						value={giftCardAmazon100}
						onChange={(e) => setGiftCardAmazon100(e.target.value)}
						className='w-1/2 border rounded px-3 py-2'
						placeholder='Giftcard $100 rate'
					/>
				</div>

				<button
					type='submit'
					className='w-full py-2 mt-4 bg-blue-500 text-white rounded'>
					Update Rates
				</button>
			</form>
			<button
				onClick={handleLogout}
				className='w-full py-2 mt-4 bg-red-500 text-white rounded'>
				Logout
			</button>
		</div>
	);
};

export default Admin;
