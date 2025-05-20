import React from 'react';
import MatchRow from './MatchRow';

const FootballSection: React.FC = () => {
  const footballMatches = [
    {
      id: 1,
      team1: 'UEFA Champions League',
      date: '01/01/2025 08:15:00 PM',
      championship: 'UEFA Champions League',
      odds: [
        { back: '-', lay: '-', backSize: '-', laySize: '-' },
        { back: '-', lay: '-', backSize: '-', laySize: '-' },
        { back: '-', lay: '-', backSize: '-', laySize: '-' },
      ],
      indicators: ['F']
    },
    {
      id: 2,
      team1: 'UEFA Nations League',
      date: '01/04/2025 04:30:00 AM',
      championship: 'UEFA Nations League',
      odds: [
        { back: '3.25', lay: '3.5', backSize: '45.4', laySize: '50' },
        { back: '-', lay: '-', backSize: '-', laySize: '-' },
        { back: '3.25', lay: '3.45', backSize: '40.39', laySize: '84.65' },
      ],
      indicators: ['F']
    },
    {
      id: 3,
      team1: 'Inter Milan U20',
      team2: 'Sampdoria U20',
      date: '10/05/2025 12:15:00 PM',
      championship: 'Italian Primavera',
      odds: [
        { back: '1.2', lay: '1.38', backSize: '-', laySize: '-' },
        { back: '4.5', lay: '11', backSize: '-', laySize: '-' },
        { back: '5.6', lay: '18', backSize: '-', laySize: '-' },
      ],
      indicators: ['F', 'B']
    }
  ];

  return (
    <div className="w-full">
      <div className="bg-gray-800 text-white font-bold py-2 px-4">
        FOOTBALL
      </div>
      {footballMatches.map((match) => (
        <MatchRow key={match.id} match={match} />
      ))}
    </div>
  );
};

export default FootballSection;