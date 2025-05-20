import React from 'react';
import CricketSection from './CricketSection';
import FootballSection from './FootballSection';

const MainContent: React.FC = () => {
  return (
    <div className="flex-1 overflow-x-auto">
      
      <CricketSection/>
      <FootballSection/>
    </div>
  );
};

export default MainContent;