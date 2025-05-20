export interface User {
  id: string;
  name?: string;
  username: string;
  balance: number;
  pl: number;
  exp: number;
  clientShare: number;
  upLine: string;
  status: {
    active: boolean;
    locked: boolean;
  };
  bet: {
    active: boolean;
    locked: boolean;
  };
  created_by?: string;
  createdAt?: string;
  type?: 'admin' | 'client';
  role?: string;
}

export interface WithdrawalData {
  availableChips: number;
  withdrawAmount: number;
  remainingBalance: number;
}
