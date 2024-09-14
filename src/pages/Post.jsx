import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
  console.log(post)
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.petImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="min-h-screen bg-gradient-to-br from-[#C499F3] via-[#F2AFEF] to-[#7360DF] py-12">
      <div className="container mx-auto px-6">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-6">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={appwriteService.getFilePreview(post.petImage)}
                  alt={post.breed}
                  className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-extrabold text-[#7360DF] mb-4">
                  {post.breed}
                </h2>
                <p className="text-lg text-gray-700 mb-2">
                  Gender: <span className="font-semibold">{post.Gender}</span>
                </p>
                <p className="text-lg text-gray-700 mb-2">
                  Age in weeks: <span className="font-semibold">{post.age}</span>
                </p>
                {!post.adopt && (
                  <p className="text-lg text-gray-700 mb-2">
                    Price: <span className="font-semibold">{post.Price}</span>
                  </p>
                )}
                <p className="text-lg text-gray-700 mb-2">
                  Contact Number: <span className="font-semibold">{post.phone}</span>
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  Location: <span className="font-semibold">{post.location}</span>
                </p>
              </div>

              {isAuthor && (
                <div className="flex space-x-4 mt-4">
                  <Link to={`/edit-post/${post.$id}`}>
                    <button className="px-6 py-2 bg-[#7360DF] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-300">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={deletePost}
                    className="px-6 py-2 bg-[#e83577] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {post.VaccinationImg && (
            <div className="p-6 border-t border-gray-200">
              <h3 className="text-2xl font-semibold text-[#7360DF] mb-4">
                Vaccination Details
              </h3>
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <div className="flex justify-center p-3">
                  <img
                    src={appwriteService.getFilePreview(post.VaccinationImg)}
                    alt="Vaccination Document"
                    className="w-1/2 object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
}

export default memo(Post);
