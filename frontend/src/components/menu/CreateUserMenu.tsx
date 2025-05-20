import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Admin } from '../../types/adminTypes';
import { getUser } from '../../api/user.api';


interface CreateUserMenuProps {
  onClose: () => void;
  mobile?: boolean;
}

const CreateUserMenu: React.FC<CreateUserMenuProps> = ({ onClose, mobile = false }) => {
    const navigate = useNavigate();
  const handleClick = (path: string) => {
    // Navigate to the specified path
    // Replace with actual navigation logic
     navigate(path);
    console.log(`Navigating to: ${path}`);
    onClose();
  };

  const [user, setUser] = useState<Admin | null>(null);
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      let isMounted = true;
      
      const checkAuth = async () => {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
  
        if (!token || !userData) {
          if (isMounted) {
            cleanUpAndRedirect();
          }
          return;
        }
  
        try {
          // First set user from local storage for immediate UI
          if (isMounted) {
            setUser(JSON.parse(userData));
          }
  
          // Verify with backend
          const response = await getUser(token);
          
          if (isMounted) {
            if (response.success && response.data) {
              setUser(response.data);
              localStorage.setItem('userData', JSON.stringify(response.data));
              setError(null);
            } else {
              throw new Error(response?.data?.message || 'Authentication failed');
            }
          }
        } catch (err) {
          console.error('Authentication check failed:', err);
          if (isMounted) {
            setError(err instanceof Error ? err.message : 'Authentication error');
            cleanUpAndRedirect();
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };
  
      const cleanUpAndRedirect = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        navigate('/');
      };
  
      checkAuth();
      const interval = setInterval(checkAuth, 30000000); // 5 minutes
  
      return () => {
        isMounted = false;
        clearInterval(interval);
      };
    }, [navigate]);
  

  if (loading) {
    return (
      <div className="w-full bg-black text-white p-2 md:p-4">
        <div className="flex justify-between items-center">
          <div className="text-xl md:text-3xl font-bold">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-black text-white p-2 md:p-4">
        <div className="flex justify-between items-center">
          <div className="text-xl md:text-3xl font-bold">99exch</div>
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${mobile ? 'py-2' : 'absolute right-0 top-full mt-2 w-48 z-50'}`}>
       {user && ['superadmin'].includes(user.role) && (
      <div 
        className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
        onClick={() => handleClick('/create-super-master')}
      >
        <div className="w-8 h-8 bg-[#CD9B4A] rounded flex items-center justify-center text-white">
          S
        </div>
        <span style={{ color: '#CD9B4A', fontWeight:'bold'}}>Super Master</span>
      </div>
       )}

        {user && ['superadmin', 'supermaster'].includes(user.role) && (
      <div 
        className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
        onClick={() => handleClick('/create-master')}
      >
        <div className="w-8 h-8 bg-[#CD9B4A] rounded flex items-center justify-center text-white">
          M
        </div>
        <span style={{ color: '#CD9B4A',fontWeight:'bold' }}>Master</span>
      </div>
        )}
      <div 
        className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
        onClick={() => handleClick('/create-client')}
      >
        <div className="w-8 h-8 bg-[#CD9B4A] rounded flex items-center justify-center text-white ">
          C
        </div>
        <span style={{ color: '#CD9B4A',fontWeight:'bold' }}>Client</span>
      </div>
    </div>
  );
};

export default CreateUserMenu;