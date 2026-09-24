import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FaBars, FaBitcoin, FaTimes } from 'react-icons/fa';
import Search from './Search';
import NavDropdown from './NavDropdown';

const CRYPTO_ITEMS = [
  { to: '/category', label: 'Category' },
  { to: '/top-gainers', label: 'Top Gainers' },
  { to: '/top-losers', label: 'Top Losers' },
];

const EXCHANGE_ITEMS = [
  { to: '/exchanges', label: 'Crypto Exchanges' },
  { to: '/dex', label: 'Decentralized Exchanges' },
  { to: '/derivatives', label: 'Derivatives' },
];

const WATCHLIST_ITEMS = [{ to: '/watchlist', label: 'My Favorites' }];

const NFT_ITEMS = [{ to: '/nft-list', label: 'NFT List' }];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="sticky top-0 z-50 bg-emerald-100/90 backdrop-blur-md border-b-2 border-emerald-300 shadow-sm">
      <div className="flex justify-between items-center p-4 w-full max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
            <FaBitcoin size={20} />
          </span>
          <span className="text-2xl font-extrabold text-emerald-800 tracking-wide font-display">
            Crypto Way
          </span>
        </Link>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="text-emerald-700 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Main menu */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:gap-6 absolute md:static bg-emerald-100 md:bg-transparent w-full md:w-auto left-0 top-[72px] p-4 pt-0 md:p-0 z-40`}
        >
          <NavDropdown label="CryptoCurrencies" items={CRYPTO_ITEMS} isMobile={isMobile} />
          <NavDropdown label="Exchanges" items={EXCHANGE_ITEMS} isMobile={isMobile} />
          <NavDropdown label="Watchlist" items={WATCHLIST_ITEMS} isMobile={isMobile} />
          <NavDropdown label="NFT" items={NFT_ITEMS} isMobile={isMobile} />

          {/* Search in mobile menu */}
          <div className="mt-4 md:hidden">
            <Search />
          </div>
        </div>

        {/* Desktop search */}
        <div className="hidden md:block">
          <Search />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
