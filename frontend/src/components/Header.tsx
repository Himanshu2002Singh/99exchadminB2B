import React, { useEffect, useState } from 'react';
import { ChevronDown, Home, Users, PlusCircle, User, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../api/user.api';
import { Admin } from '../types/adminTypes';
import CreateUserMenu from './menu/CreateUserMenu';
import ProfileMenu from './menu/ProfileMenu';
import ClientListMenu from './menu/ClientListNenu';
import MarketMenu from './menu/MarketMenu';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [user, setUser] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        if (isMounted) {
          setUser(JSON.parse(userData));
        }

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
   
    const AUTH_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
    const interval = setInterval(checkAuth, AUTH_CHECK_INTERVAL);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [navigate]);

  const toggleMenu = (menuName: string) => {
    setActiveMenu((prev: string | null) => (prev === menuName ? null : menuName));
  };

  const closeAllMenus = () => {
    setActiveMenu(null);
  };

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
    <>
      {/* Desktop Header */}
      <div className="w-full bg-black text-white hidden md:flex items-center justify-between p-2 md:p-4">
        <div className="flex items-center">
          <div className="text-xl md:text-3xl font-bold">
            {user ? user.username : '99exch'}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {user && (
            <div className="bg-white text-black p-2 rounded">
              <div className="flex flex-col">
                <span>Bal: <span className="font-bold">{user.balance}</span></span>
                <span>Upline: <span className="font-bold">{user.upline || 'None'}</span></span>
              </div>
            </div>
          )}

          {user && (
            <div className='relative'>
              <div 
                className="flex items-center md:ml-2 cursor-pointer"
                onClick={() => toggleMenu('market')}
              >
                <span>Market</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              {activeMenu === 'market' && <MarketMenu onClose={closeAllMenus} />}
            </div>
          )}
          
          {user && (
            <div className='relative'>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => toggleMenu('clientList')}
              >
                <span>Client List</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              {activeMenu === 'clientList' && <ClientListMenu onClose={closeAllMenus} />}
            </div>
          )}
          
          {user && ['superadmin', 'supermaster','master'].includes(user.role) && (
            <div className="relative">
              <div className="flex items-center cursor-pointer" onClick={() => toggleMenu('createUser')}>
                <span>Create User</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              {activeMenu === 'createUser' && <CreateUserMenu onClose={closeAllMenus} />}
            </div>
          )}

          {user && (
            <div className="relative">
              <div className="flex items-center cursor-pointer" onClick={() => toggleMenu('profilemenu')}>
                <span>{user.name}</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              {activeMenu === 'profilemenu' && <ProfileMenu onClose={closeAllMenus} />}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="w-full bg-black text-white md:hidden flex items-center justify-between p-2">
        <div className="flex items-center">
          <div className="text-xl font-bold">
            {user ? user.username : '99exch'}
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-2">
            <div className="bg-white text-black p-1 rounded text-xs">
              <div className="flex flex-col">
                <span>Bal: <span className="font-bold">{user.balance}</span></span>
                <span>Up: <span className="font-bold">{user.upline || '-'}</span></span>
              </div>
            </div>
            
            <div className="relative">
              <button 
                className={`p-2 rounded-full bg-gray rounded-lg shadow-lg ${activeMenu === 'profilemenu' ? 'bg-gray-700' : 'bg-gray-500 , text-white'}`}
                onClick={() => toggleMenu('profilemenu')}
              >
                <User size={20} />
              </button>
              {activeMenu === 'profilemenu' && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-gray-500 rounded-lg shadow-lg overflow-hidden z-50 transition-all duration-200 ease-in-out">
                  <ProfileMenu onClose={closeAllMenus} mobile />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && user && (
        <div className="fixed bottom-0 left-0 right-0 bg-black text-white md:hidden flex justify-around items-center p-2 border-t border-gray-700 z-40">
          {/* Market */}
          <div className="relative">
            <button 
              className={`p-2 rounded-full ${activeMenu === 'market' ? 'bg-gray-700' : ''}`}
              onClick={() => navigate('/dashboard')}
            >
              <Home size={20} />
            </button>
            {activeMenu === 'market' && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50 transition-all duration-200 ease-in-out">
                <MarketMenu onClose={closeAllMenus} mobile />
              </div>
            )}
          </div>

          {/* Client List */}
          <div className="relative">
            <button 
              className={`p-2 rounded-full ${activeMenu === 'clientList' ? 'bg-gray-700' : ''}`}
              onClick={() => toggleMenu('clientList')}
            >
              <Users size={20} />
            </button>
            {activeMenu === 'clientList' && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50 transition-all duration-200 ease-in-out">
                <ClientListMenu onClose={closeAllMenus} mobile />
              </div>
            )}
          </div>

          {/* Create User (for specific roles) */}
          {['superadmin', 'supermaster', 'master'].includes(user.role) && (
            <div className="relative">
              <button 
                className={`p-2 rounded-full ${activeMenu === 'createUser' ? 'bg-gray-700' : ''}`}
                onClick={() => toggleMenu('createUser')}
              >
                <PlusCircle size={20} />
              </button>
              {activeMenu === 'createUser' && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50 transition-all duration-200 ease-in-out">
                  <CreateUserMenu onClose={closeAllMenus} mobile />
                </div>
              )}
            </div>
          )}

          {/* Market Analysis */}
          <div className="relative">
            <button 
              className={`p-2 rounded-full ${activeMenu === 'marketAnalysis' ? 'bg-gray-700' : ''}`}
              onClick={() => toggleMenu('marketAnalysis')}
            >
              <BarChart size={20} />
            </button>
            {activeMenu === 'marketAnalysis' && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50 transition-all duration-200 ease-in-out">
                <MarketMenu onClose={closeAllMenus} mobile />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;