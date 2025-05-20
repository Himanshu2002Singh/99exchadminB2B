import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAdmin } from '../../api/admin.api';
import Header from '../../components/Header';
import MarqueeBanner from '../../components/MarqueeBanner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuperMasterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    repassword: '',
    role: 'supermaster',
    balance: 0,
    downline_share: 0,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get user from localStorage
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData) : { balance: 0 };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'balance' || name === 'downline_share' ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.repassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');

      if (!token || !userData) {
        throw new Error('Not authenticated. Please login again.');
      }

      const user = JSON.parse(userData);

      const completeData = {
        name: formData.name,
        username: formData.username,
        password: formData.password,
        role: formData.role,
        balance: formData.balance,
        downline_share: formData.downline_share,
        created_by: user.id,
      };

      const response = await createAdmin(completeData, token);

      if (response.success) {
        toast.success('Super Master Created Successfully');
        setFormData({
          name: '',
          username: '',
          password: '',
          repassword: '',
          role: 'supermaster',
          balance: 0,
          downline_share: 0,
        }); 

        // Reload after 1.5 seconds
        setTimeout(() => {
          window.location.reload();
        }, 1500);

      } else {
        throw new Error(response.message || 'Failed to create admin');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('authenticated')) {
          navigate('/');
        }
        toast.error(err.message);
      } else {
        toast.error('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-20 sm:pb-0">
      <Header />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      <div className="text-center py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Create New Super Master</h1>
      </div>
      <MarqueeBanner />

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-3 mb-6">Super Master Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
            <Input label="Username" name="username" value={formData.username} onChange={handleChange} />
            <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
            <Input label="Re-Password" name="repassword" type="password" value={formData.repassword} onChange={handleChange} />
            <Input label="Free Chip" name="balance" type="number" value={formData.balance.toString()} onChange={handleChange} />
            <div className="text-sm text-gray-600 mt-2 md:col-span-2">Remaining Balance: <strong>{(user.balance) -(formData.balance) }</strong></div>
          </div>

          <div className="mt-8">
            <h3 className="text-md font-semibold mb-3 text-gray-700">Share Allocation</h3>

            <div className="bg-[#003049] text-white grid grid-cols-2 text-sm font-medium">
              <div className="p-3">Down</div>
              <div className="p-3">Share</div>
            </div>

            <div className="border border-gray-300 rounded-b">
              <div className="grid grid-cols-2 p-3 border-b border-gray-200">
                <div className="text-sm text-gray-700">Available Share</div>
                <div className="text-right text-sm text-gray-700">0.00</div>
              </div>

              <div className="grid grid-cols-2 p-3 border-b border-gray-200">
                <div className="text-sm text-gray-700">Down-line Share</div>
                <div>
                  <input
                    name="downline_share"
                    type="number"
                    value={formData.downline_share.toString()}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="Down-line Share"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 p-3">
                <div className="text-sm text-gray-700">My Share</div>
                <div className="text-right text-sm text-gray-700">0.00</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              className="bg-[#CD9B4A] hover:bg-[#b88a39] transition-all px-6 py-2 text-white font-medium rounded shadow-md disabled:opacity-50"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'SUBMIT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-800 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CD9B4A]"
      placeholder={label}
    />
  </div>
);

export default SuperMasterForm;
