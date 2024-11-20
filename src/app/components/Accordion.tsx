'use client';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

type AccordionItem = {
	title: string;
	content: string;
};

const accordionData: AccordionItem[] = [
	{
		title: 'How does this platform work?',
		content:
			'This platform enables users to trade cryptocurrency, gift cards, and Deriv funds securely and easily and directly with Kacet Xchange. Users can deposit funds, buy or sell cryptocurrencies, and exchange gift cards securely and conveniently.',
	},
	{
		title: 'What payment methods are available?',
		content:
			'We support various payment methods including Online Banks,Digital Wallets,Cash and cryptocurrency.',
	},
	{
		title: 'Can I trust this KacetXchange with my data?',
		content: 'Yes, we prioritize security and guaranty client confidentiality',
	},
	{
		title: 'How can I contact support?',
		content:
			'You can reach out directly via any of our Social Links on the Website.',
	},
];

const Accordion = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const handleToggle = (index: number) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<section className='max-w-4xl mx-auto p-6'>
			<div className='mb-6'>
				<h2 className='text-3xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]'>
					Frequently Asked Questions
				</h2>
			</div>
			<div className='space-y-4'>
				{accordionData.map((item, index) => (
					<div
						key={index}
						className='border text-gray-900 rounded-lg p-4 shadow-md'>
						<button
							onClick={() => handleToggle(index)}
							className='flex items-center justify-between w-full text-left focus:outline-none'>
							<span className='font-semibold text-lg'>{item.title}</span>
							{activeIndex === index ? (
								<ChevronUpIcon className='w-5 h-5 text-gray-500' />
							) : (
								<ChevronDownIcon className='w-5 h-5 text-gray-500' />
							)}
						</button>
						{activeIndex === index && (
							<p className='mt-3 text-gray-600'>{item.content}</p>
						)}
					</div>
				))}
			</div>
		</section>
	);
};

export default Accordion;
