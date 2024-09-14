// src/PetCarePage.jsx
import React from 'react';

const PetCare = () => {
  const pets = [
    {
      image: "https://example.com/golden-retriever.jpg",
      name: 'Golden Retriever',
      exercise: 'Daily walks and playtime',
      temperature: '15-25°C',
      dos: 'Regular grooming, social interaction',
    },
    {
      image: "https://example.com/siamese-cat.jpg",
      name: 'Siamese Cat',
      exercise: 'Interactive toys and climbing',
      temperature: '20-30°C',
      dos: 'Regular vet visits, clean litter box',
    },
    {
      image: "https://example.com/labrador.jpg",
      name: 'Labrador',
      exercise: '1-2 hours per day of walking, running, or playing fetch',
      temperature: '10-27°C',
      dos: 'Socialization, obedience training, regular exercise, balanced diet, grooming 2-3 times a week',
      donts: 'Avoid toxic foods, overfeeding, neglecting exercise, skipping vet visits, leaving alone for long periods',
    },
    {
      image: "https://example.com/german-shepherd.jpg",
      name: 'German Shepherd',
      exercise: '1-2 hours of daily activities like running, hiking, or agility training',
      temperature: '10-25°C',
      dos: 'Early socialization, consistent training, daily exercise, mental stimulation, regular grooming',
      donts: 'Avoid toxic foods, overfeeding, skipping exercise, neglecting training, isolation for long periods',
    },
    {
      image: "https://example.com/pug.jpg",
      name: 'Pug',
      exercise: '30 minutes to 1 hour of light exercise daily',
      temperature: '15-23°C',
      dos: 'Gentle socialization, short walks, controlled feeding, regular grooming, facial fold cleaning',
      donts: 'Avoid overfeeding, overexercising (especially in heat), neglecting grooming, leaving alone for long periods',
    },
    {
      image: "https://example.com/beagle.jpg",
      name: 'Beagle',
      exercise: '1-2 hours of daily exercise including walks, running, and scent games',
      temperature: '10-26°C',
      dos: 'Early training, socialization, regular exercise, mental stimulation, weekly grooming',
      donts: 'Avoid overfeeding, skipping exercise, ignoring their scent drive, leaving alone for extended periods',
    },
    {
      image: "https://example.com/shih-tzu.jpg",
      name: 'Shih Tzu',
      exercise: '30 minutes to 1 hour of light exercise daily',
      temperature: '15-23°C',
      dos: 'Gentle socialization, light exercise, controlled feeding, daily grooming, facial care',
      donts: 'Avoid overfeeding, overexercising, neglecting grooming, leaving alone for long periods',
    },
    {
      image: "https://example.com/rottweiler.jpg",
      name: 'Rottweiler',
      exercise: '1-2 hours of daily exercise including walks, running, and obedience training',
      temperature: '10-25°C',
      dos: 'Early socialization, consistent training, regular exercise, mental stimulation, weekly grooming',
      donts: 'Avoid harsh training, overfeeding, skipping exercise, neglecting socialization, isolation for long periods',
    },
    {
      image: "https://example.com/indian-cat.jpg",
      name: 'Indian Billi (Indigenous Cat)',
      exercise: '30 minutes to 1 hour of playtime daily',
      temperature: '18-30°C',
      dos: 'Socialization, interactive play, balanced diet, weekly grooming, mental stimulation, regular vet check-ups',
      donts: 'Avoid toxic foods, overfeeding, declawing, ignoring need for independence, skipping vet visits',
    },
    {
      image: "https://example.com/persian-cat.jpg",
      name: 'Persian Cat',
      exercise: '20-30 minutes of gentle play daily',
      temperature: '18-25°C',
      dos: 'Daily grooming, gentle socialization, light exercise, balanced diet, regular vet check-ups',
      donts: 'Avoid overfeeding, skipping grooming, overheating, neglecting vet visits',
    },
    {
      image: "https://example.com/himalayan-cat.jpg",
      name: 'Himalayan Cat',
      exercise: '20-30 minutes of daily play',
      temperature: '18-24°C',
      dos: 'Daily grooming, gentle socialization, light exercise, balanced diet, mental stimulation',
      donts: 'Avoid overfeeding, skipping grooming, overheating, leaving alone for long periods',
    },
    {
      image: "https://example.com/bengal-cat.jpg",
      name: 'Bengal Cat',
      exercise: '1-2 hours of exercise daily',
      temperature: '15-26°C',
      dos: 'Ample physical and mental stimulation, socialization, balanced diet, weekly grooming',
      donts: 'Avoid neglecting exercise, overfeeding, leaving alone for long periods, skipping vet visits',
    },
    {
      image: "https://example.com/siamese-cat.jpg",
      name: 'Siamese Cat',
      exercise: '30 minutes to 1 hour of daily exercise',
      temperature: '18-27°C',
      dos: 'Socialization, mental stimulation, balanced diet, weekly grooming, regular interaction',
      donts: 'Avoid overfeeding, neglecting exercise, ignoring vocalizations, leaving alone for long periods',
    },
    {
      image: "https://example.com/british-shorthair-cat.jpg",
      name: 'British Shorthair Cat',
      exercise: '20-30 minutes of daily play',
      temperature: '15-25°C',
      dos: 'Weekly grooming, gentle socialization, balanced diet, mental stimulation, regular vet check-ups',
      donts: 'Avoid overfeeding, neglecting grooming, skipping exercise, leaving alone for too long',
    },
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
            {pet.donts && (
              <p className="text-gray-700">
                <span className="font-semibold text-[#C499F3]">Don'ts:</span> {pet.donts}
              </p>
            )}
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
