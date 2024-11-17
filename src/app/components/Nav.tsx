'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation'; // Hook to get the current path

export const Nav = () => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname(); // Get the current route

	// Toggle menu state
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	// Helper function to determine if a link is active
	const isActive = (href: string) =>
		pathname === href ? 'text-white' : 'hover:text-white';

	return (
		<nav className='bg-transparent absolute top-0 left-0 w-full  text-white px-6 py-4 z-50'>
			<div className='container mx-auto flex justify-between items-center'>
				{/* Logo on the left */}
				<div className='text-2xl left-0 font-bold'>
					<Link href='/' className={isActive('/')}>
						KacetXchange
					</Link>
				</div>

				{/* Hamburger Icon for mobile */}
				<div className='hidden'>
					<button onClick={toggleMenu} className='focus:outline-none'>
						{isOpen ? (
							<X className='h-6 w-6 text-white' />
						) : (
							<Menu className='h-6 w-6 text-white' />
						)}
					</button>
				</div>

				{/* Nav items - hidden on mobile, visible on desktop */}
				<div className='space-x-8 hidden'>
					<Link href='/' className={isActive('/')}>
						Home
					</Link>
					<Link href='/about' className={isActive('/about')}>
						About
					</Link>
					<Link href='/services' className={isActive('/services')}>
						Services
					</Link>
					<Link href='/contact' className={isActive('/contact')}>
						Contact
					</Link>
				</div>
			</div>

			{/* Mobile Menu (visible when hamburger is clicked) */}
			<div
				className={`${
					isOpen ? 'block' : 'hidden'
				} md:hidden bg-gray-900 w-full py-4 space-y-4 transition duration-500 ease-in-out`}>
				<Link
					href='/'
					className={`block px-4 py-2 text-lg ${isActive('/')}`}
					onClick={toggleMenu}>
					Home
				</Link>
				<Link
					href='/about'
					className={`block px-4 py-2 text-lg ${isActive('/about')}`}
					onClick={toggleMenu}>
					About
				</Link>
				<Link
					href='/services'
					className={`block px-4 py-2 text-lg ${isActive('/services')}`}
					onClick={toggleMenu}>
					Services
				</Link>
				<Link
					href='/contact'
					className={`block px-4 py-2 text-lg ${isActive('/contact')}`}
					onClick={toggleMenu}>
					Contact
				</Link>
			</div>
		</nav>
	);
};
