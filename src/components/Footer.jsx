import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6';

function Footer() {
  return (
    <footer className="bg-emerald-800 text-gray-200 w-full mt-10">
      <div className="h-1 bg-gradient-to-r from-emerald-700 via-emerald-400 to-emerald-700" />
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social section */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <h2 className="text-xl font-bold text-white font-display">Crypto Way</h2>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-white transition flex flex-col items-center gap-1">
                <span className="text-2xl"><FaFacebook /></span>
                <span className="text-xs">Facebook</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition flex flex-col items-center gap-1">
                <span className="text-2xl"><FaTwitter /></span>
                <span className="text-xs">Twitter</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition flex flex-col items-center gap-1">
                <span className="text-2xl"><FaInstagram /></span>
                <span className="text-xs">Instagram</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition flex flex-col items-center gap-1">
                <span className="text-2xl"><FaLinkedin /></span>
                <span className="text-xs">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Important links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <a href="#" className="hover:text-white transition">About Us</a>
            <a href="#" className="hover:text-white transition">Contact</a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 pt-4 border-t border-emerald-700 text-gray-400 text-xs">
          © 2024 Crypto Way. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
