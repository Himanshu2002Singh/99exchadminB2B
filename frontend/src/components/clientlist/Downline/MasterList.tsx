import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import UserTable from './UserTable';
import WithdrawModal from './WithdrawlModel';
import DepositModal from './DepositeModel';
import DownlineSearch from './SearchBar';
import { User as ClientTypesUser, WithdrawalData } from '../../../types/clienttypes';
import Header from '../../Header';
import MarqueeBanner from '../../MarqueeBanner';
import config from '../../../config';

interface DownlineUser extends ClientTypesUser {
  statusInfo?: string; // Internal use for filtering/sorting; not part of actual UI status field
  created_at?: string;
}

function MasterList() {
  const [users, setUsers] = useState<DownlineUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<DownlineUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('username');
  const [selectedUser, setSelectedUser] = useState<DownlineUser | null>(null);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDownlineData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, sortOption, users]);

  const fetchDownlineData = async () => {
  try {
    setLoading(true);
    setError('');

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const token = localStorage.getItem('authToken');

    if (!userData.id || !token) {
      throw new Error('User not authenticated');
    }

    // Define response types
    type ApiResponse = {
      success: boolean;
      data: {
        id: string;
        username: string;
        name?: string;
        role?: string;
        balance: number | string;
        status: string;
        pl?: number;
        exp?: number;
        my_share?: number;
        created_by?: string;
        createdAt?: string;
      }[];
    };

    // Make API calls with proper error handling
    const [adminsResponse] = await Promise.all([
      axios.get<ApiResponse>(`${config.baseURL}/admin/downline/${userData.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(err => {
        console.error('Admin downline error:', err);
        return { data: { success: false, data: [] } };
      }),
    
    ]);

    // Process users with proper type checking
    const processUser = (user: ApiResponse['data'][0], type: 'admin' | 'client'): DownlineUser => ({
      id: user.id.toString(),
      username: user.username,
      name: user.name,
      role: type === 'admin' ? user.role || 'admin' : 'client',
      type,
      balance: typeof user.balance === 'string' ? parseFloat(user.balance) : user.balance,
      pl: user.pl || 0,
      exp: user.exp || 0,
      clientShare: user.my_share || 0,
      upLine: userData.username || '',
      status: {
        active: user.status === 'active',
        locked: false
      },
      bet: {
        active: true,
        locked: false
      },
      created_by: user.created_by,
      createdAt: user.createdAt,
      created_at: user.createdAt,
      statusInfo: user.status
    });

    // Safely extract data from responses
    const adminUsers = adminsResponse.data.success 
      ? adminsResponse.data.data.map(admin => processUser(admin, 'admin'))
      : [];
    
    
    const combinedUsers = [...adminUsers];
    setUsers(combinedUsers);
    setFilteredUsers(combinedUsers);

  } catch (err) {
    console.error('Error fetching downline data:', err);
    setError('Failed to load downline data. Please try again later.');
  } finally {
    setLoading(false);
  }
};
  const handleSearch = useCallback(() => {
    let filtered = [...users];

    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'balance': return (b.balance || 0) - (a.balance || 0);
        case 'pl': return (b.pl || 0) - (a.pl || 0);
        case 'exp': return (b.exp || 0) - (a.exp || 0);
        case 'date': 
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        default: return (a.username || '').localeCompare(b.username || '');
      }
    });

    setFilteredUsers(filtered);
  }, [users, searchQuery, sortOption]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);


  const handleActionClick = (action: string, user: DownlineUser) => {
    setSelectedUser(user);
    switch (action) {
      case 'withdraw': setIsWithdrawModalOpen(true); break;
      case 'deposit': setIsDepositModalOpen(true); break;
      default: console.log(`Action ${action} clicked for user ${user.username}`);
    }
  };

  const handleWithdraw = (data: WithdrawalData) => {
    if (selectedUser) {
      const updatedUsers = users.map(user =>
        user.id === selectedUser.id ? { ...user, balance: data.remainingBalance } : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setIsWithdrawModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleDeposit = (amount: number) => {
    if (selectedUser) {
      const updatedUsers = users.map(user =>
        user.id === selectedUser.id ? { ...user, balance: user.balance + amount } : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setIsDepositModalOpen(false);
      setSelectedUser(null);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={fetchDownlineData}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // Retrieve userData from localStorage for use in JSX
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  return (
    <div className="min-h-screen bg-gray-100 pb-20 sm:pb-0">
       <Header />
      <div className="text-center py-2 md:py-4">
        <h1 className="text-2xl font-bold">{userData.username || 'Downline'}</h1>
      </div>
      <MarqueeBanner />
       <div className="container mx-auto p-4">
        <DownlineSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOption={sortOption}
          setSortOption={setSortOption}
          handleSearch={handleSearch}
        />
        

        <div className="bg-white rounded-lg shadow overflow-hidden mt-4">
           {filteredUsers.length > 0 ? (
            <UserTable
              users={filteredUsers}
              onActionClick={handleActionClick}
              selectedUserId={selectedUser?.id || null}
            />
          ) : (
            <div className="p-8 text-center text-gray-500">
              No users found matching your search criteria
            </div>
          )}
        </div>
      </div>

      {selectedUser && (
        <>
          <WithdrawModal
            isOpen={isWithdrawModalOpen}
            onClose={() => setIsWithdrawModalOpen(false)}
            user={selectedUser}
            onWithdraw={handleWithdraw}
          />

          <DepositModal
            isOpen={isDepositModalOpen}
            onClose={() => setIsDepositModalOpen(false)}
            user={selectedUser}
            onDeposit={handleDeposit}
          />
        </>
      )}
    </div>
  );
}

export default MasterList;
