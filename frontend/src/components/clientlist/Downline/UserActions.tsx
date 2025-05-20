import React from 'react';
import { User } from '../../../types/clienttypes';
import { Edit, Plus, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';

interface UserActionsProps {
  user: User;
  onActionClick: (action: string, user: User) => void;
}

const UserActions: React.FC<UserActionsProps> = ({ user, onActionClick }) => {
  return (
    <div className="flex gap-1">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onActionClick('edit', user);
        }}
        className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        title="Edit"
      >
        <Edit size={16} />
      </button>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onActionClick('add', user);
        }}
        className="p-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        title="Add"
      >
        <Plus size={16} />
      </button>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onActionClick('deposit', user);
        }}
        className="p-1 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
        title="Deposit"
      >
        <ArrowDownToLine size={16} />
      </button>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onActionClick('withdraw', user);
        }}
        className="p-1 bg-amber-700 text-white rounded hover:bg-amber-800 transition-colors"
        title="Withdraw"
      >
        <ArrowUpFromLine size={16} />
      </button>
    </div>
  );
};

export default UserActions;