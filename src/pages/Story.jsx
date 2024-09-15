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
    <div className="container mx-auto px-4 py-12 bg-gray-100 min-h-screen">
      <Link to="/storyform" className="inline-block px-4 py-2 bg-white text-[#AD49E1] font-semibold rounded-full shadow-md hover:bg-[#AD49E1] hover:text-white transition duration-300 ease-in-out m-4">Story Form</Link>
      
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Cute and Funny Pet Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stories.map((story) => (
          <Link to={`/storypost/${story.$id}`} key={story.$id} className="bg-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out hover:shadow-xl hover:scale-105">
            <h2>{parse(story.story)}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Story