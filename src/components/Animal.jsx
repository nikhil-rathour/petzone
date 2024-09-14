import React, { useEffect, useState } from 'react';

function AnimalSelect({ register, selectedAnimal, setSelectedAnimal }) {
  const [breeds, setBreeds] = useState([]);

  const animalOptions = {
    dog: ["Labrador Retriever", "German Shepherd", "Bulldog", "Poodle"],
    cat: ["Siamese", "Persian", "Maine Coon", "Bengal"],
  };

  useEffect(() => {
    // Update breeds based on selected animal
    if (selectedAnimal) {
      setBreeds(animalOptions[selectedAnimal] || []);
    } else {
      setBreeds([]);
    }
  }, [selectedAnimal]);

  const handleAnimalChange = (event) => {
    const animal = event.target.value;
    setSelectedAnimal(animal);
  };

  return (
    <div>
      {/* Animal Type Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Animal Type
        </label>
        <select
          name="animalType"
          value={selectedAnimal}
          onChange={handleAnimalChange}
          {...register("Type", { required: true })}
          className="mt-1 block w-full px-4 py-3 border border-teal-300 rounded-lg bg-white text-gray-800 outline-none focus:bg-teal-50 focus:ring-2 focus:ring-teal-400 duration-200"
          required
        >
          <option value="">Select an animal</option>
          {Object.keys(animalOptions).map((animal) => (
            <option key={animal} value={animal}>
              {animal.charAt(0).toUpperCase() + animal.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Breed Dropdown */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Breed
        </label>
        <select
          name="breed"
          {...register("breed", { required: true })}
          className="mt-1 block w-full px-4 py-3 border border-teal-300 rounded-lg bg-white text-gray-800 outline-none focus:bg-teal-50 focus:ring-2 focus:ring-teal-400 duration-200"
          required
          disabled={!selectedAnimal}
        >
          <option value="">Select a breed</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default AnimalSelect;
