import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import service from "../appwrite/config";
import parse from "html-react-parser";

export default function MyPost() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    service.getPosts([]).then((postsResponse) => {
      if (postsResponse) {
        const userPosts = [];
        for (var i = postsResponse.total - 1; i >= 0; i--) {
          if(postsResponse.documents[i].userId === userData.$id){
            console.log(postsResponse.documents[i],userData.$id)
            const data = postsResponse.documents[i];
          userPosts.push(data);
          }
          //   console.log(data.$createdAt.split("T",1))
        }
        setPosts(userPosts);
      }
    });
  }, [userData.$id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C499F3] via-[#F2AFEF] to-[#7360DF] p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-[#7360DF] mb-4 md:mb-0">My Pet Listings 🐾</h1>
          <Link
            to="/sell"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            Add a New Pet
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={service.getFilePreview(post.petImage)}
                  alt={post.breed || "Pet"}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-bold text-[#7360DF]">{parse(post.breed)} 🐾</h3>
                <p className="text-gray-700 mt-2">{parse(post.Type)}</p>
                <p className="text-sm text-gray-600 mt-2">Gender: {parse(post.Gender)}</p>
                <p className="text-sm text-gray-600">Location: {parse(post.location) }</p>
                <Link to={`/post/${post.$id}`} className="block mt-4">
                  <button className="w-full bg-[#7360DF] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-300">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">You haven't posted any pets yet.</h2>
            <Link
              to="/sell"
              className="inline-block bg-[#7360DF] text-white py-3 px-8 rounded-full font-bold hover:bg-opacity-90 transition-colors duration-300 transform hover:-translate-y-1"
            >
              Add Your First Pet
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
