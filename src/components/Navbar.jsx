import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'; // برای تشخیص صفحه‌نمایش‌های کوچک‌تر
import { FaBars, FaTimes } from 'react-icons/fa'; // آیکون‌های همبرگر و بستن
import Search from './Search';

function Navbar() {
    const [popover, setPopover] = useState({ crypto: false, exchanges: false, watchlist: false, nft: false });
    const [isMenuOpen, setIsMenuOpen] = useState(false); // حالت باز و بسته شدن منوی موبایل
    const popoverTimeout = React.useRef({});
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // تشخیص موبایل

    const handlePopoverOpen = (type) => {
        clearTimeout(popoverTimeout.current[type]);
        setPopover((prev) => ({ ...prev, [type]: true }));
    };

    const handlePopoverClose = (type) => {
        popoverTimeout.current[type] = setTimeout(() => {
            setPopover((prev) => ({ ...prev, [type]: false }));
        }, 100); // کاهش تأخیر
    };

    const togglePopover = (type) => {
        if (isMobile) {
            setPopover((prev) => ({ ...prev, [type]: !prev[type] }));
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="flex justify-between items-center p-4 w-full max-w-7xl mx-auto bg-emerald-100 border-b-2 border-emerald-300">
            {/* لوگو */}
            <Link to={'/'} className="text-3xl font-extrabold text-emerald-800 tracking-wide">
                Crypto Way
            </Link>

            {/* منوی همبرگری برای موبایل */}
            <div className="md:hidden">
                <button
                    onClick={toggleMenu}
                    className="text-emerald-700 focus:outline-none"
                >
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* منوی اصلی */}
            <div
                className={`${
                    isMenuOpen ? 'block' : 'hidden'
                } md:flex md:items-center md:gap-10 absolute md:static bg-emerald-100 md:bg-transparent w-full md:w-auto left-0 top-16 p-4 md:p-0 z-50`}
            >
                {/* CryptoCurrencies Button with Popover */}
                <div
                    onMouseEnter={!isMobile ? () => handlePopoverOpen('crypto') : undefined}
                    onMouseLeave={!isMobile ? () => handlePopoverClose('crypto') : undefined}
                    onClick={isMobile ? () => togglePopover('crypto') : undefined}
                    className="relative w-fit"
                >
                    <button className="relative font-semibold text-emerald-700 px-4 py-2 rounded-md hover:text-emerald-900 overflow-hidden transition duration-300 ease-in-out group">
                        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-0 blur-xl transition duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-125"></span>
                        <span className="relative z-10">CryptoCurrencies</span>
                    </button>

                    {(popover.crypto || (isMobile && popover.crypto)) && (
                        <div
                            onMouseEnter={!isMobile ? () => handlePopoverOpen('crypto') : undefined}
                            onMouseLeave={!isMobile ? () => handlePopoverClose('crypto') : undefined}
                            className="absolute top-full mt-2 bg-white shadow-xl rounded-lg p-4 w-48 flex flex-col z-50"
                        >
                            <Link to={"/category"} className="text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out transform hover:scale-105">Category</Link>
                            <Link to={"/top-gainers"} className="text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out transform hover:scale-105">Top Gainers</Link>
                            <Link to={"/top-losers"} className="text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out transform hover:scale-105">Top Losers</Link>
                        </div>
                    )}
                </div>

                {/* Exchanges Button with Popover */}
                <div
                    onMouseEnter={!isMobile ? () => handlePopoverOpen('exchanges') : undefined}
                    onMouseLeave={!isMobile ? () => handlePopoverClose('exchanges') : undefined}
                    onClick={isMobile ? () => togglePopover('exchanges') : undefined}
                    className="relative w-fit"
                >
                    <button className="relative font-semibold text-emerald-700 px-4 py-2 rounded-md hover:text-emerald-900 overflow-hidden transition duration-300 ease-in-out group">
                        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-0 blur-xl transition duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-125"></span>
                        <span className="relative z-10">Exchanges</span>
                    </button>

                    {(popover.exchanges || (isMobile && popover.exchanges)) && (
                        <div
                            onMouseEnter={!isMobile ? () => handlePopoverOpen('exchanges') : undefined}
                            onMouseLeave={!isMobile ? () => handlePopoverClose('exchanges') : undefined}
                            className="absolute top-full mt-2 bg-white shadow-xl rounded-lg p-4 w-48 flex flex-col z-50"
                        >
                            <Link to={'/exchanges'} className="text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out transform hover:scale-105">Crypto Exchanges</Link>
                            <Link to={'/dex'} className="text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out transform hover:scale-105">Decentralized Exchanges</Link>
                            <Link to={'/derivatives'} className="text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out transform hover:scale-105">Derivatives</Link>
                        </div>
                    )}
                </div>

                {/* Watchlist Button with Popover */}
                <div
                    onMouseEnter={!isMobile ? () => handlePopoverOpen('watchlist') : undefined}
                    onMouseLeave={!isMobile ? () => handlePopoverClose('watchlist') : undefined}
                    onClick={isMobile ? () => togglePopover('watchlist') : undefined}
                    className="relative w-fit"
                >
                    <button className="relative font-semibold text-emerald-700 px-4 py-2 rounded-md hover:text-emerald-900 overflow-hidden transition duration-300 ease-in-out group">
                        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-0 blur-xl transition duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-125"></span>
                        <span className="relative z-10">Watchlist</span>
                    </button>

                    {(popover.watchlist || (isMobile && popover.watchlist)) && (
                        <div
                            onMouseEnter={!isMobile ? () => handlePopoverOpen('watchlist') : undefined}
                            onMouseLeave={!isMobile ? () => handlePopoverClose('watchlist') : undefined}
                            className="absolute top-full mt-2 bg-white shadow-xl rounded-lg p-4 w-48 flex flex-col z-50"
                        >
                            <Link to={"/watchlist"} className="text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out transform hover:scale-105">My Favorites</Link>
                        </div>
                    )}
                </div>

                {/* NFT Button with Popover */}
                <div
                    onMouseEnter={!isMobile ? () => handlePopoverOpen('nft') : undefined}
                    onMouseLeave={!isMobile ? () => handlePopoverClose('nft') : undefined}
                    onClick={isMobile ? () => togglePopover('nft') : undefined}
                    className="relative w-fit"
                >
                    <button className="relative font-semibold text-emerald-700 px-4 py-2 rounded-md hover:text-emerald-900 overflow-hidden transition duration-300 ease-in-out group">
                        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-0 blur-xl transition duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-125"></span>
                        <span className="relative z-10">NFT</span>
                    </button>

                    {(popover.nft || (isMobile && popover.nft)) && (
                        <div
                            onMouseEnter={!isMobile ? () => handlePopoverOpen('nft') : undefined}
                            onMouseLeave={!isMobile ? () => handlePopoverClose('nft') : undefined}
                            className="absolute top-full mt-2 bg-white shadow-xl rounded-lg p-4 w-48 flex flex-col z-50"
                        >
                            <Link to={"/nft-list"} className="text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out transform hover:scale-105">NFT List</Link>
                        </div>
                    )}
                </div>

                {/* جستجو در منوی موبایل */}
                <div className="mt-4 md:hidden">
                    <Search />
                </div>
            </div>

            {/* جستجو در دسکتاپ */}
            <div className="hidden md:block">
                <Search />
            </div>
        </div>
    );
}

export default Navbar;