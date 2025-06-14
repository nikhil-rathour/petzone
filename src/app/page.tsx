"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Gender, Location, PetPost, PetType } from "@/types/home.types";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Dummy data for pets
const dummyPets: PetPost[] = [
  {
    id: 1,
    type: "Dog" as PetType,
    breed: "Labrador",
    gender: "Male" as Gender,
    age: 12,
    location: "Ahmedabad",
    price: 15000,
    image:
      "https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    adopt: false,
  },
  {
    id: 2,
    type: "Cat" as PetType,
    breed: "Persian",
    gender: "Female" as Gender,
    age: 8,
    location: "Gandhinagar",
    price: 12000,
    image:
      "https://images.pexels.com/photos/3299905/pexels-photo-3299905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    adopt: false,
  },
  {
    id: 3,
    type: "Dog" as PetType,
    breed: "German Shepherd",
    gender: "Male" as Gender,
    age: 16,
    location: "Surat",
    price: 20000,
    image:
      "https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    adopt: false,
  },
];

export default function Home() {
  const [selectedPet, setSelectedPet] = useState<PetType>('Dog');
  const [selectedBreed, setSelectedBreed] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<Gender | 'All'>('All');
  const [selectedLocation, setSelectedLocation] = useState<Location | 'All'>('All');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [posts, setPosts] = useState<PetPost[]>(dummyPets);
  

  const carouselImages = [
    "https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3299905/pexels-photo-3299905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [carouselImages.length]);

const handlePetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedPet(event.target.value as PetType);
  setSelectedBreed('All');
  setSelectedGender('All');
  setSelectedLocation('All');
};

const handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedBreed(event.target.value);
};

const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedGender(event.target.value as Gender | 'All');
};

const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedLocation(event.target.value as Location | 'All');
};

  const petOptions = {
    Dog: [
      "Labrador",
      "Pug",
      "Beagle",
      "German Shepherd",
      "shih tzu",
      "rottweiler",
    ],
    Cat: [
      "Persian",
      "Siamese",
      "Indian Billi (Indigenous Cat)",
      "Himalayan",
      "Bengal",
      "British Shorthair",
    ],
  };
  const locationOptions = [
    "Ahmedabad",
    "Gandhinagar",
    "Rajkot",
    "Surat",
    "Vadodara",
  ];

  const getBreeds = (type: PetType) => {
    return petOptions[type] || [];
  };

  const breeds = getBreeds(selectedPet);

  const filteredPosts = posts.filter((post) => {
    const matchesPet = post.type === selectedPet;
    const matchesBreed =
      selectedBreed === "All" ||
      post.breed.toLowerCase() === selectedBreed.toLowerCase();
    const matchesGender =
      selectedGender === "All" || post.gender === selectedGender;
    const matchesLocation =
      selectedLocation === "All" || post.location === selectedLocation as Location;
    return matchesPet && matchesBreed && matchesGender && matchesLocation;
  });

  const goToPreviousSlide = () => {
    setCurrentSlide(
      (prevSlide) =>
        (prevSlide - 1 + carouselImages.length) % carouselImages.length
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#AD49E1] to-[#EBD3F8]">
      {/* Carousel */}
      <div className="relative w-full overflow-hidden h-80 md:h-96 lg:h-[28rem]">
        <div
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className="min-w-full flex-shrink-0 relative h-full"
            >
              <Image
                src={image}
                alt={`Slide ${index}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black opacity-40 flex items-center justify-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
                  {index === 0 && "PetZone Where Every Tail Wags Happily"}
                  {index === 1 && "Love, Care, and Joy for Every Pet"}
                  {index === 2 && "Your Pet's Happiness is Our Priority"}
                </h1>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel navigation buttons */}
        <button
          onClick={goToPreviousSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-30  p-2 rounded-full hover:bg-opacity-50 transition-colors duration-300 z-10 cursor-pointer"
        >
          <span className="text-3xl text-black">
            <ChevronLeft />
          </span>
        </button>
        <button
          onClick={goToNextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition-colors duration-300 z-10 cursor-pointer"
        >
          <span className="text-3xl text-black">
            <ChevronRight />
          </span>
        </button>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-white text-center">
          Find Your Perfect Pet
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Pet Type Filter */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Pet Type
              </label>
              <select
                value={selectedPet}
                onChange={handlePetChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7360DF]"
              >
                {Object.keys(petOptions).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Breed Filter */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Breed
              </label>
              <select
                value={selectedBreed}
                onChange={handleBreedChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7360DF]"
              >
                <option value="All">All</option>
                {breeds.map((breed) => (
                  <option key={breed} value={breed.toLowerCase()}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Gender
              </label>
              <select
                value={selectedGender}
                onChange={handleGenderChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7360DF]"
              >
                <option value="All">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={handleLocationChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7360DF]"
              >
                <option value="All">All</option>
                {locationOptions.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-white text-center">
          Available Pets
        </h2>
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(
              (post) =>
                !post.adopt && (
                  <div
                    key={post.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                  >
                    <Image
                      width={500}
                      height={500}
                      src={post.image}
                      alt={post.breed}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-4">
                        {post.breed}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Pet Type:</span>{" "}
                        {post.type}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Gender:</span>{" "}
                        {post.gender}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Age:</span> {post.age}{" "}
                        weeks
                      </p>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Location:</span>{" "}
                        {post.location}
                      </p>
                      <p className="text-gray-600 mb-4">
                        <span className="font-medium">Price:</span> ₹
                        {post.price}
                      </p>
                      <Link href={`/post/${post.id}`}>
                        <button className="w-full bg-[#7360DF] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-300">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                )
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800">
              No pets found
            </h2>
            <p className="text-gray-600 mt-4">
              Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
