import React from 'react';
import { useNavigate } from 'react-router-dom';
interface ProfileMenuProps {
  onClose: () => void;
  mobile?: boolean;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onClose, mobile = false }) => {
  const navigate = useNavigate();

   const handleClick = (path: string) => {
    // Navigate to the specified path
  navigate(path);
    console.log(`Navigating to: ${path}`);
    onClose();
  };


  const handleLogout = () => {
    localStorage.removeItem('authData');
    navigate('/');
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${mobile ? 'py-2' : 'absolute right-0 top-full mt-2 w-48 z-50'}`}>
       <div 
      className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
       onClick={() =>  handleClick('/profile')}
    >
      
      <span style={{ color: '#CD9B4A'}}>Profit Loss</span>
    </div>
    <div 
      className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
      onClick={() =>  handleClick('/profile')}
    >
     
      <span style={{ color: '#CD9B4A'}}>A/C Statement</span>
    </div>
    <div 
      className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
       onClick={() =>  handleClick('/profile')}
    >
      
      <span style={{ color: '#CD9B4A' }}>Top Clients</span>
    </div>
    <div 
      className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
       onClick={() =>  handleClick('/profile')}
    >
     
      <span style={{ color: '#CD9B4A' }}>Sport Report</span>
    </div>
    <div 
      className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
      onClick={() => navigate('/create-client')}
    >
     
      <span style={{ color: '#CD9B4A' }}>Weekly Report</span>
    </div>
    <div 
      className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
      onClick={() => navigate('/create-client')}
    >
     
      <span style={{ color: '#CD9B4A' }}>Settlement Report</span>
    </div>
    <div 
      className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
      onClick={() => navigate('/create-client')}
    >
     
      <span style={{ color: '#CD9B4A' }}>Chip Smry</span>
    </div>
    <div 
      className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
      onClick={() => navigate('/create-client')}
    >
     
      <span style={{ color: '#CD9B4A' }}>Balance Sheet</span>
    </div>

    <div 
      className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
      onClick={() => navigate('/create-client')}
    >
     
      <span style={{ color: '#CD9B4A' }}>Settlement</span>
    </div>

    <div 
      className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
      onClick={() => navigate('/create-client')}
    >
     
      <span style={{ color: '#CD9B4A' }}>Export</span>
    </div>

    <div 
      className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey "
      onClick={() => navigate('/profile')}
    >
     
      <span style={{ color: '#CD9B4A' }}>Profile</span>
    </div>

    <div 
      className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b-2 border-grey"
      onClick={() => navigate('/profile')}
    >
     
      <span style={{ color: '#CD9B4A' }}>Change Password</span>
    </div>


   

      <div 
        className="flex items-center gap-2 bg-red-900 p-3 hover:bg-red-900 cursor-pointer border-b-2 border-grey"
        onClick={handleLogout}
      >
        <span style={{ color: 'white' }}>LOGOUT</span>
      </div>
    </div>
  );
};

export default ProfileMenu;