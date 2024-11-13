'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Derivbg from '@/app/assets/Deriv_Logo.jpg';
import Crypto from '@/app/assets/Crypto.png';
import Giftcard from '@/app/assets/Gift-card.webp';
import { DollarSign, ArrowUpCircle, Gift } from 'lucide-react';

const Tabs = () => {
	const [activeTab, setActiveTab] = useState('deriv');
	const [activeSubTab, setActiveSubTab] = useState('deposit');

	const [selectedCrypto, setSelectedCrypto] = useState('Bitcoin');
	const [selectedGiftcard, setSelectedGiftcard] = useState('Amazon $25');

	const [inputValue, setInputValue] = useState<number>(0);
	const [result, setResult] = useState<number>(0);

	type RateType = {
		deriv: { [key: string]: number };
		cryptocurrency: { [key: string]: { [key: string]: number } };
		giftcards: { [key: string]: number };
	};

	const rates: RateType = {
		deriv: {
			deposit: 1730,
			withdrawal: 1700,
		},
		cryptocurrency: {
			Bitcoin: { buy: 1750, sell: 1680 },
			Ethereum: { buy: 1800, sell: 1720 },
			USDT: { buy: 1600, sell: 1550 },
			Litecoin: { buy: 600, sell: 550 },
		},
		giftcards: {
			'Amazon $25': 1550,
			'Amazon $50': 1270,
			'Amazon $100': 1790,
			'iTunes $25': 1780,
			'iTunes $50': 1730,
			'iTunes $100': 1787,
			'Google Play': 1700,
		},
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value);
		if (value < 0) {
			setInputValue(0);
			setResult(0);
		} else {
			setInputValue(value);
			let currentRate = 0;

			if (activeTab === 'deriv') {
				currentRate = rates.deriv[activeSubTab] || 0;
			} else if (activeTab === 'cryptocurrency') {
				currentRate = rates.cryptocurrency[selectedCrypto]?.[activeSubTab] || 0;
			} else if (activeTab === 'giftcards') {
				currentRate = rates.giftcards[selectedGiftcard] || 0;
			}

			setResult(value * currentRate);
		}
	};

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
		setActiveSubTab(tab === 'deriv' ? 'deposit' : 'sell');
		setInputValue(0);
		setResult(0);
	};

	const handleSubTabClick = (subTab: string) => {
		setActiveSubTab(subTab);
		setInputValue(0);
		setResult(0);
	};

	const handleSubmit = () => {
		let message = '';

		if (activeTab === 'deriv') {
			if (activeSubTab === 'deposit') {
				message = `I'm looking to deposit $${inputValue} to my Deriv account @ ₦${result.toLocaleString()}.`;
			} else if (activeSubTab === 'withdrawal') {
				message = `I'd like to withdraw $${inputValue} from my Deriv account, @ ₦${result.toLocaleString()}.`;
			}
		} else if (activeTab === 'cryptocurrency') {
			message = `I'd like to ${activeSubTab} $${inputValue} worth of ${selectedCrypto} @ ₦${result.toLocaleString()}.`;
		} else if (activeTab === 'giftcards') {
			message = `I want to sell ${inputValue} ${selectedGiftcard} giftcards @ ₦${result.toLocaleString()}.`;
		}

		const phoneNumber = '+2347075252049';
		const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
			message,
		)}`;

		window.open(whatsappUrl, '_blank');
	};

	const getImageForTab = () => {
		if (activeTab === 'deriv') return Derivbg;
		if (activeTab === 'cryptocurrency') return Crypto;
		if (activeTab === 'giftcards') return Giftcard;
	};

	const cryptoOptions = ['Bitcoin', 'Ethereum', 'Litecoin', 'USDT'];
	const giftcardOptions = [
		'Amazon $25',
		'Amazon $50',
		'Amazon $100',
		'iTunes $25',
		'iTunes $50',
		'iTunes $100',
		'Google Play',
	];

	return (
		<div className='relative max-w-md mx-auto mt-3 rounded-lg'>
			<div className='absolute inset-0 bg-black bg-opacity-90 rounded-lg flex items-center justify-center max-w-[500px] w-full'></div>
			{/* Main Tabs */}
			<div className='relative flex justify-between'>
				{['deriv', 'giftcards', 'cryptocurrency'].map((tab) => (
					<button
						key={tab}
						className={`py-2 px-4 text-sm text-black font-bold uppercase flex items-center transition-colors duration-200 ${
							activeTab === tab
								? `border-b-4 border-white-500 z-10000 text-black bg-white 
              ${tab === 'deriv' ? 'rounded-tl-lg' : ''} 
              ${tab === 'cryptocurrency' ? 'rounded-tr-lg' : ''}`
								: 'text-white hover:border-b-4 hover:border-white'
						}`}
						onClick={() => handleTabClick(tab)}>
						{tab === 'deriv' && <DollarSign className='mr-1' />}
						{tab === 'giftcards' && <Gift className='mr-1' />}
						{tab === 'cryptocurrency' && <ArrowUpCircle className='mr-1' />}
						{tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
					</button>
				))}
			</div>

			{/* Sub Tabs */}
			<div className=' relative flex border-b mt-4'>
				{activeTab === 'deriv' &&
					['deposit', 'withdrawal'].map((subTab) => (
						<button
							key={subTab}
							className={`py-2 px-4 text-sm font-medium ${
								activeSubTab === subTab
									? ' text-white scale-125 font-black'
									: 'text-white hover:border-b-4 hover:border-white'
							}`}
							onClick={() => handleSubTabClick(subTab)}>
							{subTab.charAt(0).toUpperCase() + subTab.slice(1)}
						</button>
					))}
				{activeTab === 'giftcards' && (
					<button
						className={`py-2 px-4 text-sm font-medium ${
							activeSubTab === 'sell'
								? ' text-white scale-125 font-black'
								: 'text-white hover:border-b-4 hover:border-white'
						}`}
						onClick={() => handleSubTabClick('sell')}>
						Sell
					</button>
				)}
				{activeTab === 'cryptocurrency' &&
					['buy', 'sell'].map((subTab) => (
						<button
							key={subTab}
							className={`py-2 px-4 text-sm font-medium ${
								activeSubTab === subTab
									? ' text-white scale-125 font-black'
									: 'text-white hover:border-b-4 hover:border-white'
							}`}
							onClick={() => handleSubTabClick(subTab)}>
							{subTab.charAt(0).toUpperCase() + subTab.slice(1)}
						</button>
					))}
			</div>

			{/* Content */}
			<div className='p-4'>
				{(activeTab === 'deriv' && activeSubTab === 'deposit') ||
				(activeTab === 'deriv' && activeSubTab === 'withdrawal') ||
				(activeTab === 'cryptocurrency' && activeSubTab === 'buy') ||
				(activeTab === 'cryptocurrency' && activeSubTab === 'sell') ||
				(activeTab === 'giftcards' && activeSubTab === 'sell') ? (
					<div className='relative max-w-md mx-auto p-6 rounded-lg shadow-lg my-3 overflow-hidden'>
						<Image
							src={getImageForTab() ?? Derivbg} // Fallback to a default image if undefined
							alt='Background Image'
							fill
							style={{ objectFit: 'cover' }}
							className='absolute inset-0'
						/>

						<div className='absolute inset-0 bg-gradient-to-tr from-blue-200 to-indigo-900 opacity-80 rounded-lg'></div>

						{/* Content Area */}
						<div className='relative z-10 text-white'>
							<h2 className='text-lg font-semibold '>
								{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} -{' '}
								{activeSubTab.charAt(0).toUpperCase() + activeSubTab.slice(1)}
							</h2>
							<p>
								{activeTab === 'deriv' && activeSubTab === 'deposit'
									? 'Deposit funds into your Deriv account.'
									: activeTab === 'deriv' && activeSubTab === 'withdrawal'
									? 'Withdraw funds from your Deriv account.'
									: activeTab === 'cryptocurrency' && activeSubTab === 'buy'
									? 'Buy crypto.'
									: activeTab === 'cryptocurrency' && activeSubTab === 'sell'
									? 'Sell your Crypto.'
									: 'Enter the number of gift cards you want to sell:'}
							</p>
							{/* Dropdowns for Crypto and Giftcards */}
							{activeTab === 'cryptocurrency' && (
								<select
									value={selectedCrypto}
									onChange={(e) => setSelectedCrypto(e.target.value)}
									className='border text-black rounded-lg p-2 w-full mt-4'>
									{cryptoOptions.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							)}
							{activeTab === 'giftcards' && (
								<select
									value={selectedGiftcard}
									onChange={(e) => setSelectedGiftcard(e.target.value)}
									className='border text-black rounded-lg p-2 w-full mt-4'>
									{giftcardOptions.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							)}
							{/* Input Field */}
							<div className='flex items-center mt-4'>
								<input
									type='number'
									className='border text-black rounded-lg p-2 w-full mr-2'
									placeholder={
										activeTab === 'giftcards'
											? 'Number of gift cards'
											: 'Amount'
									}
									value={inputValue}
									onChange={handleInputChange}
								/>
							</div>
							{/* Estimated Value Display */}
							{result > 0 && (
								<p className='mt-4'>
									Estimated total: ₦{result.toLocaleString()}
								</p>
							)}
							{/* WhatsApp Button */}
							{result > 0 && (
								<button
									className='bg-green-500 text-white rounded-lg p-2 mt-2'
									onClick={handleSubmit}>
									Proceed via WhatsApp
								</button>
							)}
						</div>
					</div>
				) : (
					<p>Please select a tab to see the content.</p>
				)}
			</div>
		</div>
	);
};

export default Tabs;
