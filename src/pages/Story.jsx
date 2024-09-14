import React from 'react'
import { Link } from 'react-router-dom'
import { RTE } from '../components/RTE'  // Add this import

const stories = [
  {
    id: 1,
    petName: 'Fluffy',
    petType: 'Cat',
    ownerName: 'Sarah',
    story: "Fluffy decided to 'help' me work from home by sitting on my keyboard and sending gibberish emails to my boss!",
  },
  {
    id: 2,
    petName: 'Max',
    petType: 'Dog',
    ownerName: 'John',
    story: "Max got so excited during our walk that he jumped into a pond, then shook himself dry right next to a group of picnickers. Their faces were priceless!",
  },
  // ... existing code ...
]

function Story() {
  return (
    <div className="container mx-auto px-4 py-12 bg-gray-100 min-h-screen">
        <Link to="/storyform" className="inline-block px-4 py-2 bg-white text-[#AD49E1] font-semibold rounded-full shadow-md hover:bg-[#AD49E1] hover:text-white transition duration-300 ease-in-out m-4">Story Form</Link>
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Cute and Funny Pet Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stories.map((story) => (
          <div key={story.id} className="bg-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out hover:shadow-xl hover:scale-105">
            <h2 className="text-2xl font-semibold mb-3 text-indigo-600">{story.petName} the {story.petType}</h2>
            <p className="text-gray-600 mb-4 italic">Owner: {story.ownerName}</p>
            <p className="text-gray-800 leading-relaxed">{story.story}</p>
          </div>
        ))}
      </div>
      
      {/* Add the RTE component */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Add Your Pet Story</h2>
        <RTE name="petStory" label="Your Pet's Story" />
      </div>
    </div>
  )
}

export default Story