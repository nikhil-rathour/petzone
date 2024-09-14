import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import service from '../appwrite/config';
import parse from 'html-react-parser';

const Adopt = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    service.getPosts([]).then((postsResponse) => {
      if (postsResponse) {
        const adoptionPosts = postsResponse.documents.filter(post => post.adopt).reverse();
        setPosts(adoptionPosts);
      }
    });
  }, []);

  const handleClick = () => {
    navigate("/sell");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C499F3] via-[#F2AFEF] to-[#7360DF] p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-pink-600 mb-4 md:mb-0">Adopt a Pet 🐾</h1>
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1"
              onClick={handleClick}
            >
              Add a Pet to Adopt
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((pet) => (
              <div
                key={pet.$id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={service.getFilePreview(pet.petImage)}
                  alt={pet.breed}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-bold text-[#7360DF]">{parse(pet.breed)} 🐾</h3>
                <p className="text-gray-700 mt-2">{pet.description}</p>
                <p className="text-sm text-gray-600 mt-4">Pet Type: {pet.Type}</p>
                <p className="text-sm text-gray-600">Gender: {pet.Gender}</p>
                <p className="text-sm text-gray-600">Location: {pet.location}</p>
                <Link to={`/post/${pet.$id}`} className="block mt-4">
                  <button className="w-full bg-[#7360DF] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-300">
                    View Details
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-700 col-span-3 text-center text-lg">
              No pets available for adoption at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Adopt;
