import React from 'react';

interface Odds {
  back: string;
  lay: string;
  backSize: string;
  laySize: string;
}

interface Match {
  id: number;
  team1: string;
  team2?: string;
  date: string;
  championship: string;
  odds: Odds[];
  indicators: string[];
}

interface MatchRowProps {
  match: Match;
}

const MatchRow: React.FC<MatchRowProps> = ({ match }) => {
  return (
    <div className="border-b border-gray-200">
      {/* Match header */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-2 py-1">
          <div className="text-sm md:text-base font-bold">
            {match.team1} {match.team2 ? `v ${match.team2}` : ''}
            <span className="font-normal text-xs ml-1">({match.date})</span>
          </div>
        </div>
        <div className="text-xs pl-2 pb-1 text-gray-600">
          ({match.championship})
        </div>
        <div className="flex items-center pl-2 text-xs mb-1">
          <span className="font-bold mr-1">0</span>
          {match.indicators.map((indicator, index) => (
            <span 
              key={index} 
              className={`w-5 h-5 rounded-full ${
                indicator === 'F' 
                  ? 'bg-blue-500' 
                  : indicator === 'B' 
                  ? 'bg-purple-500' 
                  : 'bg-red-500'
              } text-white flex items-center justify-center mx-0.5 text-xs`}
            >
              {indicator}
            </span>
          ))}
          {match.indicators.includes('B') && (
            <span className="w-5 h-5 rounded-sm bg-cyan-200 flex items-center justify-center mx-0.5 text-xs">
              💻
            </span>
          )}
        </div>
      </div>
      
      {/* Odds table */}
      <div className="flex w-full">
        {match.odds.map((odds, index) => (
          <React.Fragment key={index}>
            <div className="flex-1 flex">
              <div className="flex-1 bg-blue-100 text-center p-1">
                <div className="font-bold">{odds.back}</div>
                <div className="text-xs">{odds.backSize}</div>
              </div>
              <div className="flex-1 bg-pink-200 text-center p-1">
                <div className="font-bold">{odds.lay}</div>
                <div className="text-xs">{odds.laySize}</div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MatchRow;