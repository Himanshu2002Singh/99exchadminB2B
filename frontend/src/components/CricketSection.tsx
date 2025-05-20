import React from 'react';
import MatchRow from './MatchRow';

const CricketSection: React.FC = () => {
  const cricketMatches = [
    {
      id: 1,
      team1: 'Essex',
      team2: 'Yorkshire',
      date: '09/05/2025 03:30:00 PM',
      championship: 'County Championship',
      odds: [
        { back: '1.73', lay: '2', backSize: '9.78', laySize: '4.51' },
        { back: '8', lay: '20', backSize: '1.42', laySize: '1' },
        { back: '2.22', lay: '2.98', backSize: '4.08', laySize: '3.96' },
      ],
      indicators: ['F', 'B']
    },
    {
      id: 2,
      team1: 'Warwickshire',
      team2: 'Surrey',
      date: '09/05/2025 03:30:00 PM',
      championship: 'County Championship',
      odds: [
        { back: '2.34', lay: '2.5', backSize: '8', laySize: '227.35' },
        { back: '1.89', lay: '1.99', backSize: '11.63', laySize: '9.41' },
        { back: '10', lay: '14', backSize: '8.38', laySize: '1.57' },
      ],
      indicators: ['F', 'B']
    },
    {
      id: 3,
      team1: 'Bangladesh A',
      team2: 'New Zealand A',
      date: '10/05/2025 08:30:00 AM',
      championship: 'Others',
      odds: [
        { back: '-', lay: '-', backSize: '-', laySize: '-' },
        { back: '-', lay: '-', backSize: '-', laySize: '-' },
        { back: '-', lay: '-', backSize: '-', laySize: '-' },
      ],
      indicators: ['F', 'B']
    },
    {
      id: 4,
      team1: 'Bangladesh SRL',
      team2: 'Afghanistan SRL',
      date: '10/05/2025 01:30:00 PM',
      championship: 'Simulated Reality League / T20 International SRL',
      odds: [
        { back: '-', lay: '-', backSize: '-', laySize: '-' },
        { back: '-', lay: '-', backSize: '-', laySize: '-' },
        { back: '-', lay: '-', backSize: '-', laySize: '-' },
      ],
      indicators: ['R']
    },
    {
      id: 5,
      team1: 'AUSTRALIA W T10',
      team2: 'ENGLAND W T10',
      date: '10/05/2025 02:20:00 PM',
      championship: 'Others',
      odds: [
        { back: '-', lay: '-', backSize: '-', laySize: '-' },
        { back: '-', lay: '-', backSize: '-', laySize: '-' },
        { back: '-', lay: '-', backSize: '-', laySize: '-' },
      ],
      indicators: ['F', 'B']
    },
    {
      id: 6,
      team1: 'SUNRISERS HYDERABAD T10',
      team2: 'RAJASTHAN ROYALS T10',
      date: '10/05/2025 02:30:00 PM',
      championship: 'Others',
      odds: [
        { back: '-', lay: '-', backSize: '-', laySize: '-' },
        { back: '-', lay: '-', backSize: '-', laySize: '-' },
        { back: '-', lay: '-', backSize: '-', laySize: '-' },
      ],
      indicators: ['F', 'B']
    },
    {
      id: 7,
      team1: 'Netherlands',
      team2: 'Scotland',
      date: '10/05/2025 02:30:00 PM',
      championship: 'ICC Cricket World Cup League 2',
      odds: [
        { back: '1.51', lay: '1.54', backSize: '828.02', laySize: '1349.2' },
        { back: '-', lay: '-', backSize: '-', laySize: '-' },
        { back: '2.84', lay: '2.98', backSize: '734.3', laySize: '474.26' },
      ],
      indicators: ['F', 'B']
    }
  ];

  return (
    <div className="w-full">
      <div className="bg-amber-500 text-white font-bold py-2 px-4">
        CRICKET
      </div>
      {cricketMatches.map((match) => (
        <MatchRow key={match.id} match={match} />
      ))}
    </div>
  );
};

export default CricketSection;