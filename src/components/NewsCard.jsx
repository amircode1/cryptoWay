import PropTypes from 'prop-types';

const NewsCard = ({ profileImage, profileName, time, title, content }) => {
  return (
    <div className="bg-white rounded-xl border-2 border-emerald-300 shadow-sm p-3 w-full">
      {/* Profile Section */}
      <div className="flex items-center mb-2">
        <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full mr-3" />
        <div>
          <p className="font-semibold text-gray-900">
            {profileName} <span className="text-emerald-500">✔️</span>
          </p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>

      {/* Content Section */}
      <div>
        <p className="text-gray-900 font-bold">{title}</p>
        <p className="text-gray-600 text-sm mt-1">{content}</p>
      </div>
    </div>
  );
};

const NewsCards = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <NewsCard
        profileImage="https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628"
        profileName="Cryptonian"
        time="8h"
        title="🚨 JUST IN: 🪙 $ETH Ethereum surpasses $3,000!"
        content="The good news which I mentioned in my earlier post has materialized! Exciting times for crypto enthusiasts."
      />
      <NewsCard
        profileImage="https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png"
        profileName="CoinEagle.com"
        time="13h"
        title="Unprecedented Inflows into Bitcoin, Ethereum ETFs"
        content="Decoding Market Implications and what this means for the crypto industry."
      />
    </div>
  );
};

NewsCard.propTypes = {
  profileImage: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default NewsCards;
