import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config';
import parse from 'html-react-parser';

const StoryPost = () => {
  const [story, setStory] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const fetchedStory = await appwriteService.getStory(id);
        setStory(fetchedStory);
      } catch (error) {
        console.error("Error fetching story:", error);
      }
    };

    fetchStory();
  }, [id]);

  const isAuthor = story && userData ? story.userId === userData.$id : false;

  const deleteStory = async () => {
    try {
      // Assuming you'll add a deleteStory method to appwriteService
      const status = await appwriteService.deleteStory(story.$id);
      if (status) {
        navigate("/story");
      }
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  if (!story) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Pet Story</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="prose max-w-none">
          {parse(story.story)}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Posted on: {new Date(story.$createdAt).toLocaleDateString()}
        </div>
        {isAuthor && (
          <div className="flex space-x-4 mt-4">
            <button
              onClick={deleteStory}
              className="px-6 py-2 bg-[#e83577] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryPost;
