import React from 'react';

const NewsCard = ({ profileImage, profileName, time, title, content, likes, comments, shares }) => {
    return (
        <div className="bg-slate-50 shadow-md rounded-lg p-3 mb-2 w-full max-w-md">
            {/* Profile Section */}
            <div className="flex items-center mb-2">
                <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <p className="font-semibold text-gray-900">
                        {profileName} <span className="text-emerald-500">✔️</span>
                    </p>
                    <p className="text-xs text-gray-700">{time}</p>
                </div>
            </div>
            
            {/* Content Section */}
            <div className="mb-3">
                <p className="text-gray-900 font-bold">{title}</p>
                <p className="text-gray-700 text-sm mt-1">{content}</p>
            </div>
        </div>
    );
};

// Example Usage
const NewsCards = () => {
    return (
        <div className="flex flex-col items-center">
            <NewsCard
                profileImage="https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628"
                profileName="Cryptonian"
                time="8h"
                title="🚨 JUST IN: 🪙 $ETH Ethereum surpasses $3,000!"
                content="The good news which I mentioned in my earlier post has materialized! Exciting times for crypto enthusiasts."
                likes="55"
                comments="20"
                shares="10"
            />
            <NewsCard
                profileImage="https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png"
                profileName="CoinEagle.com"
                time="13h"
                title="Unprecedented Inflows into Bitcoin, Ethereum ETFs"
                content="Decoding Market Implications and what this means for the crypto industry."
                likes="110"
                comments="40"
                shares="25"
            />
        </div>
    );
};

export default NewsCards;
