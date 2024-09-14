import React, { useState } from 'react';
import LogoutBtn from '../components/Header/LogoutBtn';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPaw, FaSignOutAlt, FaEdit } from 'react-icons/fa';

const ProfilePage = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');

  const handleMyPosts = () => {
    navigate('/mypost');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#AD49E1] to-[#EBD3F8] p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gradient-to-b from-[#7360DF] to-[#C499F3] p-6 text-white">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  className="w-40 h-40 rounded-full border-4 border-white mx-auto mb-4 shadow-lg transition-transform duration-300 hover:scale-105"
                  src={userData.avatar || "https://via.placeholder.com/160"}
                  alt="Profile"
                />
                <button className="absolute bottom-4 right-0 bg-white text-[#7360DF] rounded-full p-2 shadow-md hover:bg-[#7360DF] hover:text-white transition duration-300">
                  <FaEdit />
                </button>
              </div>
              <h2 className="text-3xl font-bold mb-2">{userData.name}</h2>
              <p className="text-sm opacity-75 mb-4">{userData.email}</p>
            </div>
            <nav className="mt-8 space-y-2">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex items-center w-full py-2 px-4 rounded transition duration-300 ${activeTab === 'info' ? 'bg-white text-[#7360DF]' : 'text-white hover:bg-white/10'}`}
              >
                <FaUser className="mr-2" /> Profile Info
              </button>
              <button
                onClick={() => setActiveTab('posts')}
                className={`flex items-center w-full py-2 px-4 rounded transition duration-300 ${activeTab === 'posts' ? 'bg-white text-[#7360DF]' : 'text-white hover:bg-white/10'}`}
              >
                <FaPaw className="mr-2" /> My Posts
              </button>
            </nav>
          </div>
          <div className="md:w-2/3 p-8">
            {activeTab === 'info' && (
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-[#7360DF] mb-6 border-b pb-2">Profile Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <FaUser className="text-[#7360DF] mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">{userData.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-[#7360DF] mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{userData.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'posts' && (
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-[#7360DF] mb-6 border-b pb-2">My Posts</h3>
                <button 
                  onClick={handleMyPosts}
                  className="px-6 py-3 font-semibold bg-[#7360DF] text-white rounded-md hover:bg-[#5A4BB7] transition duration-300 ease-in-out flex items-center"
                >
                  <FaPaw className="mr-2" /> View All Posts
                </button>
              </div>
            )}
          </div>
        </div>
        {authStatus && (
          <div className="bg-gray-100 p-4 flex justify-end">
            <LogoutBtn />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
