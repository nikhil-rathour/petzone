import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import parse from 'html-react-parser';

const StoryPost = () => {
  const [story, setStory] = useState(null);
  const { id } = useParams();

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
      </div>
    </div>
  );
};

export default StoryPost;
