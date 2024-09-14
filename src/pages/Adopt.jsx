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
        const adoptionPosts = postsResponse.documents
          .filter(post => post.adopt && post.status === "active")
          .reverse();
        setPosts(adoptionPosts);
      }
    }).catch(error => {
      console.error("Error fetching posts:", error);
    });
  }, []);

  const handleClick = () => {
    navigate("/sell");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#AD49E1] to-[#EBD3F8]">
      {/* Header */}
      <div className="relative w-full overflow-hidden h-80 md:h-96 lg:h-[28rem]">
        <img
          src="https://images.pexels.com/photos/27162829/pexels-photo-27162829/free-photo-of-jack-russell-terrier-puppy.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Pet Adoption Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
          Give a Pet a Home, Gain a Lifetime of Love
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">Available Pets for Adoption</h2>
          <button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1"
            onClick={handleClick}
          >
            Add a Pet to Adopt
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((pet) => (
              <div
                key={pet.$id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={service.getFilePreview(pet.petImage)}
                  alt={pet.breed}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-[#7360DF]">{parse(pet.breed)} 🐾</h3>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Pet Type:</span> {pet.type}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Gender:</span> {pet.gender}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Age:</span> {pet.age} weeks
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-medium">Location:</span> {pet.location}
                  </p>
                  <Link to={`/post/${pet.$id}`} className="block mt-4">
                    <button className="w-full bg-[#7360DF] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-300">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-20 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800">No pets available for adoption</h2>
              <p className="text-gray-600 mt-4">Check back later for new additions!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Adopt;
