import React from 'react';

interface SportItem {
  name: string;
  count: number;
  active?: boolean;
  color: string;
}

const Sidebar: React.FC = () => {
  const sports: SportItem[] = [
    { name: 'IN-PLAY', count: 142, active: true, color: 'bg-amber-500' },
    { name: 'CRICKET', count: 53, color: 'bg-green-500' },
    { name: 'FOOTBALL', count: 47, color: 'bg-blue-500' },
    { name: 'TENNIS', count: 83, color: 'bg-green-500' },
    { name: 'HORSE RACING', count: 0, color: 'bg-green-800' },
    { name: 'GREYHOUND RACING', count: 0, color: 'bg-green-800' },
    { name: 'POLITICS', count: 0, color: 'bg-green-800' },
    { name: 'INT CASINO', count: 0, color: 'bg-green-800' },
    { name: 'KABADDI', count: 0, color: 'bg-green-800' },
    { name: 'SPORTS BOOK', count: 0, color: 'bg-green-800' },
  ];

  return (
    <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible md:w-[120px] border-r border-gray-200">
      {sports.map((sport, index) => (
        <div 
          key={index} 
          className={`flex flex-col items-center justify-center p-2 border-b border-gray-200 min-w-[80px] md:min-w-0 ${
            sport.active ? 'bg-amber-500' : 'bg-white'
          }`}
        >
          {sport.active ? (
            <div className="relative">
              <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center mb-1">
                <span>⌚</span>
              </div>
              <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {sport.count}
              </span>
            </div>
          ) : (
            <div className="relative">
              <SportIcon name={sport.name} />
              <span className={`absolute -top-2 -right-2 text-[10px] font-bold ${sport.color} text-white rounded-full w-5 h-5 flex items-center justify-center`}>
                {sport.count}
              </span>
            </div>
          )}
          <span className={`text-xs mt-1 text-center ${sport.active ? 'text-red-600 font-bold' : ''}`}>
            {sport.active ? 'IN-PLAY' : sport.name}
          </span>
        </div>
      ))}
    </div>
  );
};

const SportIcon: React.FC<{ name: string }> = ({ name }) => {
  switch (name) {
    case 'CRICKET':
      return <div className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center">🏏</div>;
    case 'FOOTBALL':
      return <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center">⚽</div>;
    case 'TENNIS':
      return <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center">🎾</div>;
    case 'HORSE RACING':
      return <div className="w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center">🐎</div>;
    case 'GREYHOUND RACING':
      return <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">🐕</div>;
    case 'POLITICS':
      return <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">📝</div>;
    case 'INT CASINO':
      return <div className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center">🎰</div>;
    case 'KABADDI':
      return <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center">🏃</div>;
    case 'SPORTS BOOK':
      return <div className="w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center">📕</div>;
    default:
      return <div className="w-6 h-6 rounded-full bg-gray-200" />;
  }
};

export default Sidebar;