import React from 'react'

function CardCoin({ coin }) {
    if (!coin) {
        return <div>Loading...</div>;
    }

    // Safe access to nested properties
    const price = coin.current_price || (coin.market_data && coin.market_data.current_price && coin.market_data.current_price.usd) || 'N/A';
    const priceChange = coin.price_change_percentage_24h || (coin.market_data && coin.market_data.price_change_percentage_24h) || 'N/A';

    return (
        <div className='relative'>
            {coin.image && (
                <img 
                    className='w-20 h-20 absolute right-0 top-0' 
                    src={coin.image} 
                    alt={coin.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder.png'; // Add a fallback image
                    }}
                />
            )}
            <h3 className="text-xl font-semibold">
                {coin.name} ({coin.symbol?.toUpperCase()})
            </h3>
            <p>Price: ${typeof price === 'number' ? price.toLocaleString() : price}</p>
            <p>24h Change: {typeof priceChange === 'number' ? priceChange.toFixed(2) : priceChange}%</p>
        </div>
    );
}

export default CardCoin;