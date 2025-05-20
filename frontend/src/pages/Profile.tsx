import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { Admin } from '../types/adminTypes';
import { useEffect, useState } from 'react';
import { getUser } from '../api/user.api';
import { FaUser, FaUserCircle, FaCoins, FaChartLine, FaEye, FaFutbol, FaTrophy, FaDog, FaDice } from 'react-icons/fa';
import Header from '../components/Header';
import MarqueeBanner from '../components/MarqueeBanner';


const Profile = () => {
  const navigate = useNavigate();
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
    const interval = setInterval(checkAuth, 30000000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="w-full bg-black text-white p-2 md:p-4 pb-20">
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="text-center py-2 md:py-4">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      <MarqueeBanner />
   
      {/* <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-neutral-900">Profile</h1>
      </div> */}
      
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
        {user && (
          <div className="py-4">
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* <div className="border-b border-neutral-200 px-6 py-4 bg-gray-50">
                <h2 className="text-lg font-medium text-neutral-900">User Details</h2>
              </div> */}
              
              <div className="divide-y">
  <div className="px-6 py-4 flex items-center">
    <FaUser className="text-blue-500 mr-2" />
    <span className="text-neutral-500 w-48">Name :</span>
    <span className="text-neutral-900 font-medium">{user.name}</span>
  </div>

  <div className="px-6 py-4 flex items-center">
    <FaUserCircle className="text-green-500 mr-2" />
    <span className="text-neutral-500 w-48">Username :</span>
    <span className="text-neutral-900 font-medium">{user.username}</span>
  </div>

  <div className="px-6 py-4 flex items-center">
    <FaCoins className="text-yellow-500 mr-2" />
    <span className="text-neutral-500 w-48">Free Chip :</span>
    <span className="text-neutral-900 font-medium">{user.balance}</span>
  </div>

  <div className="px-6 py-4 flex items-center">
    <FaChartLine className="text-red-500 mr-2" />
    <span className="text-neutral-500 w-48">P/L :</span>
    <span className="text-neutral-900 font-medium">0.00</span>
  </div>

  <div className="px-6 py-4 flex items-center">
    <FaEye className="text-purple-500 mr-2" />
    <span className="text-neutral-500 w-48">Upline :</span>
    <span className="text-neutral-900 font-medium">{user.upline}</span>
  </div>

  <div className="px-6 py-4 flex items-center">
    <FaFutbol className="text-indigo-500 mr-2" />
    <span className="text-neutral-500 w-48">Football Client Share :</span>
    <span className="text-neutral-900 font-medium">0.00</span>
  </div>

  <div className="px-6 py-4 flex items-center">
    <FaTrophy className="text-orange-500 mr-2" />
    <span className="text-neutral-500 w-48">Tennis Client Share :</span>
    <span className="text-neutral-900 font-medium">0.00</span>
  </div>

  <div className="px-6 py-4 flex items-center">
    <FaDog className="text-pink-500 mr-2" />
    <span className="text-neutral-500 w-48">Greyhound Client Share :</span>
    <span className="text-neutral-900 font-medium">0.00</span>
  </div>

  <div className="px-6 py-4 flex items-center">
    <FaDice className="text-cyan-500 mr-2" />
    <span className="text-neutral-500 w-48">Casino Client Share :</span>
    <span className="text-neutral-900 font-medium">0.00</span>
  </div>
              </div>

            </motion.div>
          </div>
        )}
      </div>
    </div>
 
    
  )
}

export default Profile