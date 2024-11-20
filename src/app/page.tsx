'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Nav } from './components/Nav';
import bitcoin from '@/app/assets/bitcoin.svg';
import deriv from '@/app/assets/deriv.jpg';
import cashapp from '@/app/assets/cashapp.webp';
import paypal from '@/app/assets/paypal.png';
import ether from '@/app/assets/ether.svg';
import tether from '@/app/assets/tether.svg';
import herobg from '@/app/assets/herobg.jpg';
import { FaTelegramPlane } from 'react-icons/fa';
import Tabs from './components/Tabs';
import { FaInstagram } from 'react-icons/fa';
import { FaClockRotateLeft, FaXTwitter } from 'react-icons/fa6';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { GiReceiveMoney, GiTakeMyMoney } from 'react-icons/gi';
import Accordion from './components/Accordion';
import SpecificCoinsTable from './components/SpecificCoinsTable';
import ForexTable from './components/ForexTable';

export default function Home() {
	const router = useRouter();

	const handleAdminRedirect = () => {
		router.push('/admin'); // Redirects to the admin page
	};
	const paymentImages = [
		{
			src: cashapp,
			alt: 'Receive CashApp payment method',
			width: 200,
			height: 100,
			link: 'https://wa.me/+2348114310177?text=Available%20For%20Cashapp%20Transaction?', // Replace with your WhatsApp link
		},
		{
			src: bitcoin,
			alt: 'Receive Bitcoin payment method',
			width: 200,
			height: 100,
			link: 'https://wa.me/+2348114310177?text=Available%20For%20Bitcoin%20Transaction?',
		},
		{
			src: deriv,
			alt: 'Deposit and withdraw Deriv payment agent',
			width: 200,
			height: 100,
			link: 'https://wa.me/+2348114310177?text=Available%20For%20Deriv%20Transaction?',
		},
		{
			src: ether,
			alt: 'Receive Ether payment method',
			width: 200,
			height: 100,
			link: 'https://wa.me/+2348114310177?text=Available%20For%20Ethereum%20Transaction?',
		},
		{
			src: paypal,
			alt: 'Receive PayPal payment method',
			width: 200,
			height: 100,
			link: 'https://wa.me/+2348114310177?text=Available%20For%20Paypal%20Transaction?',
		},
		{
			src: tether,
			alt: 'Receive Tether payment method',
			width: 200,
			height: 100,
			link: 'https://wa.me/+2348114310177?text=Available%20For%20USDT%20Transaction?',
		},
	];

	return (
		<div className='bg-white text-white'>
			<Nav />
			<section
				className='relative flex flex-col md:flex-row pb-2 items-center px-6 bg-cover bg-center bg-no-repeat'
				style={{
					backgroundImage: `url(${herobg.src})`,
				}}>
				<div className='grid mt-14 grid-cols-1 md:grid-cols-2 gap-1  w-full'>
					<div className='flex flex-col items-center justify-center relative mb-1 md:mb-0 text-center md:text-left'>
						<h1 className='text-4xl md:text-4xl lg:text-5xl font-bold mb-4 pt-8 text-white'>
							Buy & Sell Bitcoin Securely
						</h1>
						<p className='text-lg md:text-xl mb-2'>
							Trade your digital assets instantly with the best rates, swiftly
							and securely.
						</p>
						<div className='block md:flex justify-center md:justify-start gap-1'>
							<div className='px-8 md:px-0 lg:px-6 py-2'>
								<div className='grid'>
									<div className='relative group mw-[300px]'>
										<div className='absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt' />
										<button className='relative px-6 py-3 bg-black rounded-lg flex items-center justify-center space-x-4'>
											<span className='text-indigo-400 group-hover:text-gray-100 transition duration-200 flex items-center space-x-2'>
												<span>Follow us</span>

												<span className='inline'>&rarr;</span>
											</span>
										</button>
									</div>
								</div>
							</div>

							<div className='flex space-x-6 mt-3'>
								{[
									{
										Icon: FaTelegramPlane,
										gradient: 'from-blue-600 to-blue-500',
										link: 'https://t.me/KACETXChange',
									},
									{
										Icon: FaInstagram,
										gradient: 'from-pink-500 via-red-500 to-yellow-500',
										link: 'https://www.instagram.com/kacet_x_change',
									},
									{
										Icon: FaXTwitter,
										gradient: 'from-blue-400 to-blue-300',
										link: 'https://x.com/BazunuFavour',
									},
								].map(({ Icon, gradient, link }, index) => (
									<Link key={index} href={link} passHref>
										<a
											target='_blank'
											rel='noopener noreferrer'
											className='w-10 h-10 flex items-center justify-center rounded-full relative overflow-hidden bg-white shadow-md shadow-gray-200 group transition-all duration-500'>
											<div
												className={`absolute top-full left-0 w-full h-full rounded-full bg-gradient-to-r ${gradient} z-0 transition-all duration-500 group-hover:top-0`}
											/>
											<Icon
												className='text-gray-900 relative z-10 transition-all duration-500 group-hover:text-white'
												size={24}
											/>
										</a>
									</Link>
								))}
							</div>
						</div>
					</div>

					<div className='relative flex justify-center items-center mt-8 md:mt-0'>
						<Tabs />
					</div>
				</div>
			</section>

			<section className='py-4 px-4'>
				<div className='grid grid-cols-3 justify-center items-center gap-4 md:grid-cols-6 xl:grid-cols-none xl:flex xl:justify-between'>
					{paymentImages.map(({ src, alt, link }, index) => (
						<div key={index} className={`flex items-center justify-center p-4`}>
							<a href={link} target='_blank' rel='noopener noreferrer'>
								<Image src={src} alt={alt} width={100} height={55} priority />
							</a>
						</div>
					))}
				</div>
			</section>

			<SpecificCoinsTable />

			<ForexTable />
			<section className='py-4'>
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<div className='mb-2 text-center'>
						<h2 className='text-4xl font-bold text-gray-900 py-5'>
							Why Choose Us
						</h2>
						<p className='text-lg font-normal text-gray-500 max-w-md md:max-w-2xl mx-auto'>
							Experience seamless transactions with our advanced, user-friendly
							platform tailored for all your cryptocurrency, gift cards, and
							Deriv needs.
						</p>
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
						<div className='text-center max-w-sm mx-auto group'>
							<Link
								href='https://wa.me/+2348114310177'
								target='_blank'
								rel='noopener noreferrer'
								className='block' // Make the entire div clickable
							>
								<div className='bg-indigo-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto transition-all duration-500 group-hover:bg-indigo-600'>
									<GiTakeMyMoney
										className='text-indigo-600 group-hover:text-white'
										size={30}
									/>
								</div>
								<h4 className='text-lg font-medium text-gray-900 mb-3'>Buy</h4>
								<p className='text-sm text-gray-500'>
									Easily buy cryptocurrency, gift cards, and Deriv funds with a
									few clicks.
								</p>
							</Link>
						</div>
						<div className='text-center max-w-sm mx-auto group'>
							<Link
								href='https://wa.me/+2348114310177'
								target='_blank'
								rel='noopener noreferrer'
								className='block'>
								{' '}
								// Make the entire div clickable
								<div className='bg-pink-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto transition-all duration-500 group-hover:bg-pink-600'>
									<GiReceiveMoney
										className='text-pink-600 group-hover:text-white'
										size={30}
									/>
								</div>
								<h4 className='text-lg font-medium text-gray-900 mb-3'>Sell</h4>
								<p className='text-sm text-gray-500'>
									Get instant value when you sell your digital assets with our
									platform.
								</p>
							</Link>
						</div>
						<div className='text-center max-w-sm mx-auto group'>
							<div className='bg-teal-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto transition-all duration-500 group-hover:bg-teal-600'>
								<FaClockRotateLeft
									className='text-teal-600 group-hover:text-white'
									size={30}
								/>
							</div>
							<h4 className='text-lg font-medium text-gray-900 mb-3'>
								24/7 Availability
							</h4>
							<p className='text-sm text-gray-500'>
								Our support and services are available around the clock to
								assist you.
							</p>
						</div>
						<div className='text-center max-w-sm mx-auto group'>
							<div className='bg-blue-50 rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto transition-all duration-500 group-hover:bg-blue-600'>
								<RiSecurePaymentLine
									className='text-blue-600 group-hover:text-white'
									size={30}
								/>
							</div>
							<h4 className='text-lg font-medium text-gray-900 mb-3'>
								Secure Payments
							</h4>
							<p className='text-sm text-gray-500'>
								All your transactions are safe and secure with our encrypted
								platform.
							</p>
						</div>
					</div>
				</div>
			</section>
			<Accordion />

			<section
				className='py-8 justify-center bg-yellow-500'
				style={{
					backgroundImage:
						"url('https://images.unsplash.com/photo-1636953099671-481a72803051?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
				}}>
				<div className='container mx-auto text-center'>
					<h2 className='text-xl font-bold mb-3'>Start Trading Today</h2>
					<p className='text-md mb-3'>
						Join Us on Our Telegram Channel For Free Tutorials and Courses to
						become a Master Trader
					</p>

					<div className='px-8 py-2'>
						<div className='grid place-items-center'>
							<div className='relative group max-w-[200px]'>
								<div className='absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt max-w-[150]' />

								<Link href='https://t.me/KACETEXCHANGE' passHref legacyBehavior>
									<a target='_blank' rel='noopener noreferrer'>
										<button className='relative px-6 py-3 bg-black rounded-lg leading-none flex items-center space-x-4'>
											<span className='text-gray-100'>Join Us</span>
											<span className='pl-2 text-indigo-400 group-hover:text-gray-100 transition duration-200'>
												<FaTelegramPlane size={20} />
											</span>
										</button>
									</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className='flex items-center gap-2 py-8 bg-gray-900  text-center'>
				<p className='text-gray-400'>
					&copy; 2024 KacetXchange. All rights reserved{' '}
					<span onClick={handleAdminRedirect}> | Managed by Admin</span>
				</p>
			</footer>
		</div>
	);
}
