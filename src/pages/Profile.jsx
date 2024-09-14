import React from 'react';
import LogOutBtn from '../Components/Header/LogOutBtn';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMyPosts = () => {
    navigate('/mypost');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C499F3] via-[#F2AFEF] to-[#7360DF] p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-[#7360DF] to-[#C499F3] p-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <img
            className="w-20 h-20 rounded-full border-4 border-white"
            src="https://via.placeholder.com/100"
            alt="Profile"
          />
        </div>

        <div className="p-6 space-y-6">
          {userData && userData.name && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#e63579]">{userData.name}</h2>
            </div>
          )}
          <div className="text-center">
            <button 
              onClick={handleMyPosts}
              className="w-full px-6 py-2 font-semibold bg-[#e63579] text-white
              hover:bg-[#d62d6b] rounded-md transition duration-300 ease-in-out"
            >
              My Posts
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-[#e63579]">Email</h3>
              <p className="text-gray-700">{userData.email}</p>
            </div>
          </div>
          
          {authStatus && <LogOutBtn/>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
