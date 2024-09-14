import React from 'react';
import LogoutBtn from '../components/Header/LogoutBtn';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const handleMyPosts = () => {
    navigate('/mypost');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#AD49E1] to-[#EBD3F8] p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#7360DF] to-[#C499F3] p-6">
          <h1 className="text-3xl font-bold text-white text-center">Profile</h1>
        </div>

        <div className="p-6 space-y-6">
          {userData && userData.name && (
            <div className="text-center">
              <img
                className="w-24 h-24 rounded-full border-4 border-[#7360DF] mx-auto mb-4"
                src="https://via.placeholder.com/100"
                alt="Profile"
              />
              <h2 className="text-2xl font-bold text-[#7360DF]">{userData.name}</h2>
            </div>
          )}

          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-[#7360DF]">Email</h3>
              <p className="text-gray-700">{userData.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleMyPosts}
              className="w-full px-6 py-3 font-semibold bg-[#7360DF] text-white
              hover:bg-opacity-90 rounded-md transition duration-300 ease-in-out"
            >
              My Posts
            </button>
            
            {authStatus && <LogoutBtn />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
