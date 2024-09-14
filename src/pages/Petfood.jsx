import React, { useState } from "react";

const PetFood = () => {
  const [selectedPet, setSelectedPet] = useState("All");
  const [selectedBreed, setSelectedBreed] = useState("All");

  // Sample pet food data based on pet type and breed
  const petFoodData = [
    {
      id: 1,
      photo:
        "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
      name: "Organic Dog Food",
      petType: "Dog",
      breed: "Labrador",
      description: "High-quality organic dog food for Labradors.",
      price: "599",
    },
    {
      id: 2,
      photo:
        "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
      name: "Grain-Free Cat Food",
      petType: "Cat",
      breed: "Siamese",
      description: "Grain-free cat food for Siamese cats.",
      price: "999",
    },
    {
      id: 3,
      photo:
        "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
      name: "Puppy Chow",
      petType: "Dog",
      breed: "Labrador",
      description: "Special formula for Labrador puppies.",
      price: "999",
    },
  ];

  // Pet breeds available based on selected pet type
  const breedOptions = {
    Dog: ["Labrador", "Golden Retriever"],
    Cat: ["Siamese"],
  };

  // Filter pet food based on selected pet type and breed
  const filteredPetFood = petFoodData.filter((food) => {
    return (
      (selectedPet === "All" || food.petType === selectedPet) &&
      (selectedBreed === "All" || food.breed === selectedBreed)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C499F3] via-[#F2AFEF] to-[#7360DF]">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl text-center font-bold text-[#e63579] p-4 rounded-lg mb-8 max-w-3xl mx-auto shadow-lg bg-transparent backdrop-blur-sm">
          PetZone Food 🐾
        </h1>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-[#7360DF]">
            Find the Perfect Food for Your Pet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pet Type Filter */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Pet Type</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#7360DF]"
                value={selectedPet}
                onChange={(e) => {
                  setSelectedPet(e.target.value);
                  setSelectedBreed("All");
                }}
              >
                <option value="All">All Pets</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>
            </div>

            {/* Breed Filter */}
            {selectedPet !== "All" && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Breed</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#7360DF]"
                  value={selectedBreed}
                  onChange={(e) => setSelectedBreed(e.target.value)}
                >
                  <option value="All">All Breeds</option>
                  {breedOptions[selectedPet]?.map((breed) => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Pet Food Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPetFood.length > 0 ? (
            filteredPetFood.map((food) => (
              <div
                key={food.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={food.photo}
                  alt={food.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-[#7360DF] mb-2">
                    {food.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{food.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-semibold text-[#C499F3]">₹{food.price}</span>
                    <span className="text-sm text-gray-500">{food.petType} - {food.breed}</span>
                  </div>
                  <button className="w-full bg-[#7360DF] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">No food options available</h2>
              <p className="text-gray-600">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetFood;
