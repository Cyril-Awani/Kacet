'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Derivbg from '@/app/assets/Deriv_Logo.jpg';
import Crypto from '@/app/assets/Crypto.png';
import Giftcard from '@/app/assets/Gift-card.webp';
import { DollarSign, ArrowUpCircle, Gift } from 'lucide-react';

type DerivSubTab = 'deposit' | 'withdrawal';
type CryptoSubTab = 'buy' | 'sell';
type GiftCardSubTab = 'sell';
type Tab = 'deriv' | 'cryptocurrency' | 'giftcards';

interface Rates {
	deriv: {
		deposit: number;
		withdrawal: number;
	};
	cryptocurrency: Record<string, { buy: number; sell: number }>;
	giftcards: Record<string, number>;
}

const Tabs = () => {
	const [activeTab, setActiveTab] = useState<Tab>('deriv');
	const [activeSubTab, setActiveSubTab] = useState<
		DerivSubTab | CryptoSubTab | GiftCardSubTab
	>('deposit');
	const [selectedCrypto, setSelectedCrypto] = useState('Bitcoin');
	const [selectedGiftcardCategory, setSelectedGiftcardCategory] =
		useState<keyof typeof giftcardCategories>('iTunes');
	const [selectedGiftcard, setSelectedGiftcard] = useState('iTunes US $10-$90');
	const [inputValue, setInputValue] = useState<number>(0);
	const [result, setResult] = useState<number>(0);

	const [rates, setRates] = useState<Rates>({
		deriv: { deposit: 1730, withdrawal: 1700 },
		cryptocurrency: {
			Bitcoin: { buy: 1750, sell: 1680 },
			Ethereum: { buy: 1800, sell: 1720 },
			USDT: { buy: 1600, sell: 1550 },
			Litecoin: { buy: 600, sell: 550 },
			Solana: { buy: 600, sell: 550 },
		},
		giftcards: {
			// Amazon giftcards
			'Amazon $25': 1550,
			'Amazon $50': 1270,
			'Amazon $100': 1790,
			'Amazon UK $10-$100': 1450,
			'Amazon Germany $10-$100': 1600,
			'Amazon US $10-$90': 1500,
			'Amazon US $100': 1780,
			'Amazon UK': 1700,

			// iTunes giftcards
			'iTunes $25': 1780,
			'iTunes $50': 1730,
			'iTunes $100': 1787,
			'iTunes US $10-$90': 1800,
			'iTunes US $100/$150/$200': 1850,
			'iTunes UK': 1720,
			'iTunes Germany': 1730,

			// Google Play giftcards
			'Google Play US': 1700,
			'Google Play UK': 1680,
			'Google Play Other Countries': 1600,

			// Other giftcards
			'Nike $100-$500': 1450,
			'Steam USD': 1500,
			'X-Box $10-$250': 1550,
			'Razer Gold $10-$500': 1600,
		},
	});

	useEffect(() => {
		const fetchRates = async () => {
			try {
				const response = await axios.get<Rates>('/api/getRates');
				setRates(response.data);
			} catch (error) {
				console.error('Error fetching rates:', error);
			}
		};

		fetchRates();
	}, []);

	const giftcardCategories: {
		iTunes: string[];
		GooglePlay: string[];
		Amazon: string[];
		Others: string[];
	} = {
		iTunes: [
			'iTunes US $10-$90',
			'iTunes US $100/$150/$200',
			'iTunes UK',
			'iTunes Germany',
		],
		GooglePlay: [
			'Google Play US',
			'Google Play UK',
			'Google Play Other Countries',
		],
		Amazon: [
			'Amazon US $10-$90',
			'Amazon UK $10-$100',
			'Amazon Germany $10-$100',
		],
		Others: [
			'Nike $100-$500',
			'Steam USD',
			'X-Box $10-$250',
			'Razer Gold $10-$500',
		],
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value);
		if (value < 0) {
			setInputValue(0);
			setResult(0);
		} else {
			setInputValue(value);
			let currentRate = 0;

			if (activeTab === 'deriv' && activeSubTab in rates.deriv) {
				currentRate = rates.deriv[activeSubTab as DerivSubTab];
			} else if (
				activeTab === 'cryptocurrency' &&
				selectedCrypto in rates.cryptocurrency
			) {
				currentRate =
					rates.cryptocurrency[selectedCrypto][activeSubTab as CryptoSubTab] ||
					0;
			} else if (
				activeTab === 'giftcards' &&
				selectedGiftcard in rates.giftcards
			) {
				currentRate = rates.giftcards[selectedGiftcard]; // Use the correct rate for giftcards
			}

			console.log('Current rate:', currentRate);
			setResult(value * currentRate);
		}
	};

	const tabOptions: Tab[] = ['deriv', 'giftcards', 'cryptocurrency'];
	const handleTabClick = (tab: Tab) => {
		setActiveTab(tab);
		setActiveSubTab(tab === 'deriv' ? 'deposit' : 'sell');
		setInputValue(0);
		setResult(0);
	};

	const handleSubTabClick = (
		subTab: DerivSubTab | CryptoSubTab | GiftCardSubTab,
	) => {
		setActiveSubTab(subTab);
		setInputValue(0);
		setResult(0);
	};

	const handleSubmit = () => {
		let message = '';

		if (activeTab === 'deriv') {
			if (activeSubTab === 'deposit') {
				message = `I'm looking to deposit $${inputValue} to my Deriv account`;
			} else if (activeSubTab === 'withdrawal') {
				message = `I'd like to withdraw $${inputValue} from my Deriv account.`;
			}
		} else if (activeTab === 'cryptocurrency') {
			message = `I'd like to ${activeSubTab} $${inputValue} worth of ${selectedCrypto}`;
		} else if (activeTab === 'giftcards') {
			message = `I want to sell ${inputValue} ${selectedGiftcard} giftcards.`;
			//₦${result.toLocaleString(),@ ₦${result.toLocaleString()}.
		}

		const phoneNumber = '+2348114310177';
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

	const cryptoOptions = ['Bitcoin', 'Ethereum', 'Litecoin', 'USDT', 'Solana'];
	const renderGiftcardSubOptions = () => {
		const options = giftcardCategories[selectedGiftcardCategory];
		return (
			<select
				value={selectedGiftcard}
				onChange={(e) => setSelectedGiftcard(e.target.value)}
				className='border text-black rounded-lg p-2 w-full mt-4'>
				{options.map((option: string) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		);
	};

	return (
		<div className='relative max-w-md mx-auto rounded-lg'>
			<div className='absolute inset-0 bg-black bg-opacity-90 rounded-lg flex items-center justify-center max-w-[500px] w-full'></div>
			{/* Main Tabs */}
			<div className='relative flex justify-between'>
				{tabOptions.map((tab) => (
					<button
						key={tab}
						className={`py-2 px-4 text-xs text-black font-bold uppercase flex items-center transition-colors duration-200 ${
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
			<div className='relative pl-5 flex pr-10 md:pr-0 border-b mt-2'>
				{activeTab === 'deriv' &&
					['deposit', 'withdrawal'].map((subTab) => (
						<button
							key={subTab}
							className={`px-4 text-sm font-medium ${
								activeSubTab === subTab
									? ' text-white scale-125 font-black'
									: 'text-gray-400 hover:border-b-4 hover:border-white'
							}`}
							onClick={() => handleSubTabClick(subTab as DerivSubTab)}>
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
									: 'text-gray-400 hover:border-b-4 hover:border-white'
							}`}
							onClick={() => handleSubTabClick(subTab as CryptoSubTab)}>
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
					<div className='relative max-w-md mx-auto py-4 px-6 rounded-lg shadow-lg overflow-hidden'>
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
								<div>
									<select
										value={selectedGiftcardCategory}
										onChange={(e) =>
											setSelectedGiftcardCategory(
												e.target.value as keyof typeof giftcardCategories,
											)
										}
										className='border text-black rounded-lg p-2 w-full mt-4'>
										{Object.keys(giftcardCategories).map((category) => (
											<option key={category} value={category}>
												{category}
											</option>
										))}
									</select>
									{renderGiftcardSubOptions()}
								</div>
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
							{/* {result > 0 && (
    <p className='mt-4'>
        Estimated total: ₦{result.toLocaleString()}
    </p>
)} */}

							{/* WhatsApp Button */}
							<div className='flex pr-2 justify-end'>
								{result > 0 && (
									<button
										className='bg-green-500 ml-auto text-white rounded-lg p-2 mt-2'
										onClick={handleSubmit}>
										Proceed via WhatsApp
									</button>
								)}
							</div>
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
