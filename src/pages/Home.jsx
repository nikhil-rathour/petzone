// src/Home.jsx
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../Components/PostCard';
import { useSelector } from 'react-redux';
import service from '../appwrite/config';
import authService from '../appwrite/auth';
import parse from 'html-react-parser';

const Home = () => {
  const [selectedPet, setSelectedPet] = useState('Dog');
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3299905/pexels-photo-3299905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2272938/pexels-photo-2272938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ];

  const [posts,setPosts] = useState([])
  const [user, Setuser] = useState(false);

  useEffect(() => {
    service.getPosts([]).then((postsResponse) => {
      console.log(postsResponse,'hi')
      if (postsResponse) {
        const userPosts = [];
        for (var i = postsResponse.total - 1; i >= 0; i--) {
          const data = postsResponse.documents[i];
          userPosts.push(data);
          //   console.log(data.$createdAt.split("T",1))
        }
        setPosts(userPosts);
      }
    });
    authService.getCurrentUser().then((state) => Setuser(state.auth.status));

    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [carouselImages.length]);

  const handlePetChange = (event) => {
    setSelectedPet(event.target.value);
    setSelectedBreed('All');
    setSelectedGender('All');
    setSelectedLocation('All');
  };

  const handleBreedChange = (event) => {
    setSelectedBreed(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const getBreeds = (Type) => {
    if (Type === 'Dog' ) {
      return ['All', 'Labrador', 'Pug', 'Beagle', 'German Shepherd', 'shih tzu', 'rottweiler',];
    } else if (Type === 'Cat') {
      return ['All', 'Persian', 'Siamese', 'Indian Billi (Indigenous Cat)', 'Himalayan', 'Bengal', 'British Shorthair'];
    }
    return [];
  };

  const breeds = getBreeds(selectedPet);

  const filteredPosts = posts.filter((post) => {
    const matchesPet = post.Type === selectedPet;
    const matchesBreed = selectedBreed === 'All' || post.breed === selectedBreed;
    const matchesGender = selectedGender === 'All' || post.Gender === selectedGender;
    const matchesLocation = selectedLocation === 'All' || post.location === selectedLocation;
    return matchesPet && matchesBreed && matchesGender && matchesLocation;
  });

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#AD49E1] to-[#EBD3F8]">
      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselImages.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img src={image} alt={`Slide ${index}`} className="w-full h-56 md:h-64 lg:h-72 object-cover" />
            </div>
          ))}
        </div>

        {/* Previous Arrow */}
        <button
          onClick={goToPreviousSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-300"
        >
          <span className="text-2xl">&lt;</span>
        </button>

        {/* Next Arrow */}
        <button
          onClick={goToNextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-300"
        >
          <span className="text-2xl">&gt;</span>
        </button>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 py-6">
        <h2 className="text-3xl font-bold mb-6">
          Find Your Perfect Pet
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Pet Type Filter */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Pet Type</label>
            <select
              value={selectedPet}
              onChange={handlePetChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </select>
          </div>

          {/* Breed Filter */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Breed</label>
            <select
              value={selectedBreed}
              onChange={handleBreedChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
            >
              {breeds.map((breed) => (
                 <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Gender</label>
            <select
              value={selectedGender}
              onChange={handleGenderChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <select
              value={selectedLocation}
              onChange={handleLocationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Gandhinagar">Gandhinagar</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Surat">Surat</option>
              <option value="Vadodara">Vadodara</option>
            </select>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="container mx-auto px-6 py-6">
        <h2 className="text-3xl font-bold mb-6">
          Available Pets
        </h2>
        {filteredPosts.length > 0 ? (
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
             post.adopt ? null :
            
             <div
             key={index}
             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
           >
             <img
        src={service.getFilePreview(post.petImage)}
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
        <Link to={`/post/${post.$id}`}>
        <button className="mt-4 w-full bg-[#7360DF] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-300">
          View Details
        </button>
        </Link>
      </div>
           </div>
           
             
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">No pets found</h2>
            <p className="text-gray-600 mt-4">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

  
    </div>
  );
};

export default Home;
