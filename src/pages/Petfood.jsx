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
    <div className="min-h-screen bg-gradient-to-br from-[#AD49E1] to-[#EBD3F8]">
      {/* Header */}
      <div className="relative w-full overflow-hidden h-80 md:h-96 lg:h-[28rem]">
        <img
          // src="https://images.pexels.com/photos/1350591/pexels-photo-1350591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          src="https://images.pexels.com/photos/230785/pexels-photo-230785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"

          alt="Pet Food Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
          Satisfying Cravings, Supporting Health
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-white text-center">
          Find the Perfect Food for Your Pet
        </h2>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pet Type Filter */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Pet Type</label>
              <select
                value={selectedPet}
                onChange={(e) => {
                  setSelectedPet(e.target.value);
                  setSelectedBreed("All");
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7360DF]"
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
                  value={selectedBreed}
                  onChange={(e) => setSelectedBreed(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7360DF]"
                >
                  <option value="All">All Breeds</option>
                  {breedOptions[selectedPet]?.map((breed) => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Pet Food Cards */}
        {filteredPetFood.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPetFood.map((food) => (
              <div
                key={food.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={food.photo}
                  alt={food.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{food.name}</h3>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Pet Type:</span> {food.petType}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Breed:</span> {food.breed}
                  </p>
                  <p className="text-gray-600 mb-4">{food.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-[#7360DF]">₹{food.price}</span>
                  </div>
                  <button className="w-full bg-[#7360DF] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800">No food options available</h2>
            <p className="text-gray-600 mt-4">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetFood;
