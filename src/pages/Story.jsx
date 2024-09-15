import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'
import { Query } from 'appwrite' // Add this import
import parse from 'html-react-parser';

function Story() {
  const [stories, setStories] = useState([])

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const response = await service.getStories([Query.equal("status", "active")])
      if (response) {
        setStories(response.documents)
        console.log(response.documents)
      }
    } catch (error) {
      console.error("Error fetching stories:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#AD49E1] to-[#EBD3F8]">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Cute and Funny Pet Stories</h1>
        
        <Link to="/storyform" className="inline-block px-6 py-3 bg-white text-[#AD49E1] font-semibold rounded-full shadow-md hover:bg-[#AD49E1] hover:text-white transition duration-300 ease-in-out mb-8">
          Share Your Story
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Link to={`/storypost/${story.$id}`} key={story.$id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">{parse(story.title || 'Untitled Story')}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{parse(story.story)}</p>
                <div className="text-[#AD49E1] font-medium">Read more</div>
              </div>
            </Link>
          ))}
        </div>
        
        {stories.length === 0 && (
          <div className="text-center py-20 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800">No stories found</h2>
            <p className="text-gray-600 mt-4">Be the first to share your pet's story!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Story