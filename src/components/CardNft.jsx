import React from 'react'

function CardNft({ nft }) {
    // بررسی اگر داده‌ها به درستی بارگذاری شده‌اند
    if (!nft) {
        return <div>Loading...</div>;
    }

    // Safe access to properties with defaults
    const price = nft.floor_price || 'N/A';
    const priceChange = nft.floor_price_24h_percentage_change || 'N/A';

    return (
        <div className='relative'>
            {/* بررسی صحت داده‌ها */}
            {nft?.thumb && (
                <img 
                    className='w-20 h-20 absolute right-0 top-0' 
                    src={nft?.thumb} 
                    alt={nft?.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder.png'; // Add a fallback image
                    }}
                />
            )}
            <h3 className="text-xl font-semibold">{nft?.name} ({nft?.symbol?.toUpperCase()})</h3>
            <p>Price: ${typeof price === 'number' ? price.toLocaleString() : price}</p>
            <p>24h Change: {typeof priceChange === 'number' ? priceChange.toFixed(2) : priceChange}%</p>
        </div>
    );
}

export default CardNft;
