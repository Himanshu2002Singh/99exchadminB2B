import React from 'react';
import { useNavigate } from 'react-router-dom';


interface MarketMenuProps {
  onClose: () => void;
  mobile?: boolean;
}

const MarketMenu: React.FC<MarketMenuProps> = ({ onClose, mobile = false }) => {
   const navigate = useNavigate();
   const handleClick = (path: string) => {
     // Navigate to the specified path
     // Replace with actual navigation logic
      navigate(path);
    onClose();
  };
;


  return (
   <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${mobile ? 'py-2' : 'absolute right-0 top-full mt-2 w-48 z-50'}`}>
      <div 
        className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
        onClick={() => handleClick('/global-markets')}
      > 
        
        <span style={{ color: '#CD9B4A' , fontWeight:'bold'}}>Market Analysis</span>
      </div>
      <div 
        className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
         onClick={() => handleClick('/market-trends')}
      >
       
        <span style={{ color: '#CD9B4A' , fontWeight:'bold'}}>Multi Market</span>
      </div>
      <div 
        className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
         onClick={() => handleClick('/market-trends')}
      >
        
        <span style={{ color: '#CD9B4A', fontWeight:'bold' }}>Unsetteled Bets</span>
      </div>
      <div 
        className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
        onClick={() => navigate('/create-client')}
      >
       
        <span style={{ color: '#CD9B4A' }}>int casino history</span>
      </div>
    </div>
  );
};

export default MarketMenu;