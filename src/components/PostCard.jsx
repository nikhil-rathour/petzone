import React from 'react'
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';
import parse from 'html-react-parser'



function PostCard({post}) {
    return (
       <>
         <img
           src={appwriteService.getFilePreview(post.petImage)}
           alt={post.breed}
           className="w-full h-56 object-cover"
         />
         <div className="p-4">
           <p className="text-gray-600 mt-2">
             <span className="font-medium">Pet Type:</span> {post.Type}
           </p>
           <p className="text-gray-600 mt-2">
             <span className="font-medium">Breed:</span> {parse(post.breed)}
           </p>
           <p className="text-gray-600 mt-1">
             <span className="font-medium">Gender:</span> {post.Gender}
           </p>
           <p className="text-gray-600 mt-1">
             <span className="font-medium">Location:</span> {post.location}
           </p>
           <button className="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300">
             <Link to={`/post/${post.$id}`}>View Details</Link>
           </button>
         </div>
       </>
    )
}

export default PostCard
