import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6';

function Footer() {
    return (
        <footer className="bg-emerald-800 text-gray-200 p-6 md:p-8 w-full max-w-7xl mx-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* بخش شبکه‌های اجتماعی */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-4 md:mb-0">
                    <h2 className="text-xl font-bold text-white">Crypto Way</h2>
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-300 hover:text-white transition flex flex-col items-center">
                            <i className="text-3xl"><FaFacebook/></i> Facebook
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white transition flex flex-col items-center">
                            <i className="text-3xl"><FaTwitter/></i> Twitter
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white transition flex flex-col items-center">
                            <i className="text-3xl"><FaInstagram/></i> Instagram
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white transition flex flex-col items-center">
                            <i className="text-3xl"><FaLinkedin/></i> LinkedIn
                        </a>
                    </div>
                </div>

                {/* لینک‌های مهم */}
                <div className="flex gap-6 text-sm text-gray-300 mb-4 md:mb-0">
                    <a href="#" className="hover:text-white transition">About Us</a>
                    <a href="#" className="hover:text-white transition">Contact</a>
                    <a href="#" className="hover:text-white transition">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition">Terms of Service</a>
                </div>
            </div>

            {/* کپی‌رایت */}
            <div className="text-center mt-4 text-gray-400 text-xs">
                © 2024 Crypto Way. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
