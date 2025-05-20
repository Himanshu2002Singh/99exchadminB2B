import React from 'react';

const MarqueeBanner: React.FC = () => {
  return (
    <>
      
      <div className="bg-gray-100 border-t border-b border-gray-300 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content py-1">
            <span className="text-sm md:text-base">
              🏆 BETS STARTED IN OUR EXCHANGE 🏆 PAKISTAN SUPER LEAGUE(PSL) 2025 CUP WINNER MARKET BETS STARTED IN OUR EXCHANGE 🏆 OUR EXCLUSIVE PREMIUM MARKET FOR (SRL) IS NOW STARTED IN OUR EXCHANGE
            </span>
          </div>
        </div>
      </div>
      <style>
        {`
          .marquee-container {
            width: 100%;
            overflow: hidden;
          }
          .marquee-content {
            display: inline-block;
            white-space: nowrap;
            animation: marquee 30s linear infinite;
          }
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </>
  );
};

export default MarqueeBanner;