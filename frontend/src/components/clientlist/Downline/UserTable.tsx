import React from 'react';
import { User } from '../../../types/clienttypes';
import { Lock } from 'lucide-react';
import UserActions from './UserActions';

interface UserTableProps {
  users: User[];
  onActionClick: (action: string, user: User) => void;
  selectedUserId: string | null;
}

const UserTable: React.FC<UserTableProps> = ({ users, onActionClick, selectedUserId }) => {
  // Helper function to safely format numbers
  const formatNumber = (value: unknown, isPercentage = false, decimals = 2) => {
    const num = typeof value === 'number' ? value : 0;
    const formatted = num.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
    return isPercentage ? `${formatted}%` : formatted;
  };

  // Safely calculate totals
  const calculateTotal = (key: keyof User) => {
    return users.reduce((sum, user) => {
      const value = user[key];
      return sum + (typeof value === 'number' ? value : 0);
    }, 0);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-amber-500 text-white">
            <th className="py-3 px-4 text-left font-semibold">USERNAME</th>
            <th className="py-3 px-4 text-left font-semibold">BALANCE</th>
            <th className="py-3 px-4 text-left font-semibold">P/L</th>
            <th className="py-3 px-4 text-left font-semibold">EXP</th>
            <th className="py-3 px-4 text-left font-semibold hidden md:table-cell">CLIENT SHARE</th>
            <th className="py-3 px-4 text-left font-semibold hidden md:table-cell">UP-LINE</th>
            <th className="py-3 px-4 text-left font-semibold">STATUS</th>
            <th className="py-3 px-4 text-left font-semibold">BET</th>
            <th className="py-3 px-4 text-left font-semibold">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr 
              key={user.id} 
              className={`border-b border-gray-200 hover:bg-gray-50 ${selectedUserId === user.id ? 'bg-amber-50' : ''}`}
            >
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <span className="bg-amber-500 text-white w-6 h-6 flex items-center justify-center rounded mr-2">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                  {user.username || 'Unknown'}
                </div>
              </td>
              <td className="py-3 px-4">{formatNumber(user.balance)}</td>
              <td className="py-3 px-4">{formatNumber(user.pl)}</td>
              <td className="py-3 px-4">{formatNumber(user.exp)}</td>
              <td className="py-3 px-4 hidden md:table-cell">{formatNumber(user.clientShare, true)}</td>
              <td className="py-3 px-4 hidden md:table-cell">{user.upLine || '-'}</td>
              <td className="py-3 px-4">
                <div className="flex justify-center">
                  <div className={`${user.status?.active ? 'text-green-500' : 'text-gray-400'}`}>
                    <Lock size={20} />
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-center">
                  <div className={`${user.bet?.active ? 'text-green-500' : 'text-gray-400'}`}>
                    <Lock size={20} />
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-1 justify-center">
                  <UserActions user={user} onActionClick={onActionClick} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-100">
          <tr>
            <td className="py-3 px-4 font-medium">Total:</td>
            <td className="py-3 px-4 font-medium">{formatNumber(calculateTotal('balance'))}</td>
            <td className="py-3 px-4 font-medium">{formatNumber(calculateTotal('pl'))}</td>
            <td className="py-3 px-4 font-medium">{formatNumber(calculateTotal('exp'))}</td>
            <td className="py-3 px-4 hidden md:table-cell"></td>
            <td className="py-3 px-4 hidden md:table-cell"></td>
            <td className="py-3 px-4"></td>
            <td className="py-3 px-4"></td>
            <td className="py-3 px-4"></td>
          </tr>
        </tfoot>
      </table>
      
      {/* Mobile view action buttons */}
      <div className="md:hidden mt-4 bg-white p-4 rounded shadow-sm">
        {selectedUserId && (
          <div className="flex flex-wrap gap-2 justify-center">
            <button 
              onClick={() => onActionClick('edit', users.find(u => u.id === selectedUserId)!)}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Edit
            </button>
            <button 
              onClick={() => onActionClick('add', users.find(u => u.id === selectedUserId)!)}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
            >
              Add
            </button>
            <button 
              onClick={() => onActionClick('deposit', users.find(u => u.id === selectedUserId)!)}
              className="px-3 py-1 bg-amber-600 text-white rounded text-sm hover:bg-amber-700"
            >
              Deposit
            </button>
            <button 
              onClick={() => onActionClick('withdraw', users.find(u => u.id === selectedUserId)!)}
              className="px-3 py-1 bg-amber-700 text-white rounded text-sm hover:bg-amber-800"
            >
              Withdraw
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;