import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Reusable dropdown for the navbar. On desktop it opens as an absolute popover
// on hover; on mobile it expands inline inside the hamburger menu.
const NavDropdown = ({ label, items, isMobile }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const openMenu = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 100);
  };

  const toggle = () => setOpen((prev) => !prev);

  const containerHandlers = isMobile
    ? { onClick: toggle }
    : { onMouseEnter: openMenu, onMouseLeave: closeMenu };

  const popoverHandlers = isMobile
    ? {}
    : { onMouseEnter: openMenu, onMouseLeave: closeMenu };

  return (
    <div {...containerHandlers} className="relative w-full md:w-fit">
      <button
        type="button"
        aria-expanded={open}
        className="w-full md:w-auto relative font-semibold text-emerald-700 px-4 py-2 rounded-md hover:text-emerald-900 transition duration-300 ease-in-out group"
      >
        <span className="relative z-10 flex items-center gap-1.5">
          {label}
          <svg
            className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {open &&
        (isMobile ? (
          <div className="flex flex-col pl-4 pb-2">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out"
              >
                {item.label}
              </Link>
            ))}
          </div>
        ) : (
          <div
            {...popoverHandlers}
            className="absolute top-full left-0 mt-2 bg-white shadow-xl rounded-lg p-2 w-48 flex flex-col z-50"
          >
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out"
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
    </div>
  );
};

NavDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  isMobile: PropTypes.bool,
};

export default NavDropdown;
