// src/PetCarePage.jsx
import React from 'react';

const PetCare = () => {
  const pets = [
    {
      image: "https://m.media-amazon.com/images/I/61TaEvXhyyL._SX300_SY300_QL70_FMwebp_.jpghttps://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
      name: 'Golden Retriever',
      exercise: 'Daily walks and playtime',
      temperature: '15-25°C',
      dos: 'Regular grooming, social interaction',
    },
    {
      image:  "https://m.media-amazon.com/images/I/61TaEvXhyyL._SX300_SY300_QL70_FMwebp_.jpghttps://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
      name: 'Siamese Cat',
      exercise: 'Interactive toys and climbing',
      temperature: '20-30°C',
      dos: 'Regular vet visits, clean litter box',
    },
    // Add more pets as needed
  ];

  const PetCard = ({ pet }) => {
    return (
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
        <img className="w-full h-48 object-cover" src={pet.image} alt={pet.name} />
        <div className="px-6 py-4">
          <div className="font-bold text-2xl mb-3 text-[#7360DF]">{pet.name}</div>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold text-[#C499F3]">Exercise:</span> {pet.exercise}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-[#C499F3]">Temperature:</span> {pet.temperature}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-[#C499F3]">Do's:</span> {pet.dos}
            </p>
          </div>
        </div>
        <div className="px-6 py-4 bg-gradient-to-r from-[#F2AFEF] to-[#C499F3]">
          <button className="w-full bg-[#7360DF] text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transition-colors duration-300">
            Learn More
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C499F3] via-[#F2AFEF] to-[#7360DF] py-8">
      <h1 className="text-4xl text-center font-bold text-[#e63579] p-4 rounded-lg mb-8 max-w-3xl mx-auto shadow-lg">
        Pet Care Guide
      </h1>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pets.map((pet, index) => (
            <PetCard key={index} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetCare;
