import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { User } from '../../../types/clienttypes';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onDeposit: (amount: number) => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ 
  isOpen, 
  onClose, 
  user, 
  onDeposit 
}) => {
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [newBalance, setNewBalance] = useState<number>(0);

  useEffect(() => {
    if (user && isOpen) {
      setNewBalance(user.balance || 0);
      setDepositAmount('');
    }
  }, [user, isOpen]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setDepositAmount(value);
      if (user) {
        const amount = parseFloat(value) || 0;
        setNewBalance((user.balance || 0) + amount);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const amount = parseFloat(depositAmount) || 0;
      if (amount > 0) {
        onDeposit(amount);
      }
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">DEPOSIT CHIPS</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">Current Balance</label>
            <div className="border-b border-gray-300 pb-2 text-xl font-medium">
              {(user.balance || 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="depositAmount" className="block text-gray-700 font-semibold">
              Deposit Amount
            </label>
            <input
              id="depositAmount"
              type="text"
              value={depositAmount}
              onChange={handleAmountChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter amount"
              inputMode="decimal"
              pattern="[0-9]*\.?[0-9]*"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">New Balance</label>
            <div className="border-b border-gray-300 pb-2 text-xl font-medium">
              {newBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </div>
          </div>
          
          <div className="pt-4">
            <button 
              type="submit"
              disabled={!depositAmount || parseFloat(depositAmount) <= 0}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CONFIRM DEPOSIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepositModal;