// src/PetCarePage.jsx
import React, { useState } from 'react';

const PetCard = ({ pet }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
      <div className="relative h-48">
        <img className="w-full h-full object-cover" src={pet.image} alt={pet.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">{pet.name}</h3>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium text-[#7360DF]">Exercise:</span> {pet.exercise}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium text-[#7360DF]">Temperature:</span> {pet.temperature}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium text-[#7360DF]">Do's:</span> {pet.dos}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-[#7360DF]">Don'ts:</span> {pet.donts || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

const petData = [
  {
    image: "https://imgs.search.brave.com/p2YnRl7qvHMVnBikIhbTHolu0ByzkmMEDn_F3CXtQDA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzQ0LzIzLzg4/LzM2MF9GXzQ0MjM4/ODgwX0dzUndsb2dM/aVpCYjhKb1V3RXZC/VUlXcERhMGNQM0ZW/LmpwZw",
    name: 'Siamese Cat',
    exercise: '30 minutes to 1 hour of interactive play daily',
    temperature: '18-27°C',
    dos: 'Provide stimulating environment, early socialization, daily play sessions, balanced diet, weekly grooming, mental stimulation, quality bonding time',
    donts: 'Avoid toxic foods, overfeeding, neglecting exercise, leaving alone for long periods, ignoring vocalizations, skipping vet check-ups',
  },
  {
    image: "https://imgs.search.brave.com/uqYawO9H7DuUueuULqqjT4AmtzbswuvsezwMiK9aQxM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTMw/MzMwNDczL3Bob3Rv/L2xhYnJhZG9yLXJl/dHJpZXZlci1kb2ct/c21pbGVzLW9uLWJl/bmNoLW91dGRvb3Jz/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz00ZWgtcUIwZzZ5/c3E0V0ozaWtYb1Fa/dmxtcWVpM3VvRU50/dVAyQ0I2WC1JPQ",
    name: 'Labrador',
    exercise: '1-2 hours per day of walking, running, or playing fetch',
    temperature: '10-27°C',
    dos: 'Socialization, obedience training, regular exercise, balanced diet, grooming 2-3 times a week, provide safe chew toys, spend quality bonding time',
    donts: 'Avoid toxic foods, overfeeding, neglecting exercise, skipping vet visits, leaving alone for long periods, ignoring mental stimulation needs',
  },
  {
    image: "https://imgs.search.brave.com/en78uyXewoNYYHYroL1HOtJEs2e3r-8vwcZbtdZXuN0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5wZXRtZC5jb20v/ZmlsZXMvc3R5bGVz/Lzk3OHg1NTAvcHVi/bGljLzIwMjItMTAv/Z2VybWFuLXNoZXBo/ZXJkLmpwZWc_dz0y/MDQ4JnE9NzU",
    name: 'German Shepherd',
    exercise: '1-2 hours of daily activities like running, hiking, or agility training',
    temperature: '10-25°C',
    dos: 'Early socialization, consistent training, daily exercise, mental stimulation, regular grooming',
    donts: 'Avoid toxic foods, overfeeding, skipping exercise, neglecting training, isolation for long periods',
  },
  {
    image: "https://imgs.search.brave.com/Z9BG6doUmEQhcCPlt14s9uJeUneKRqRLYwB6p9vlSLI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvMTcz/NDgyNzM4L3N0b2Nr/LXBob3RvLXB1Zw.jpeg",
    name: 'Pug',
    exercise: '30 minutes to 1 hour of light exercise daily',
    temperature: '15-23°C',
    dos: 'Gentle socialization, short walks, controlled feeding, regular grooming, facial fold cleaning',
    donts: 'Avoid overfeeding, overexercising (especially in heat), neglecting grooming, leaving alone for long periods',
  },
  {
    image: "https://imgs.search.brave.com/1BhjmQlCrhZgN1WTHMP2WyQXvWhWTcculRMQE3o2xQA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTk2/MDgzODc2L3Bob3Rv/L2JlYWdsZS1kb2cu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXB0X2p1cFhOMmlf/TWZuWnQ2OHB3X193/VENzUmU4REJxRXF2/bGczdlp3d0k9",
    name: 'Beagle',
    exercise: '1-2 hours of daily exercise including walks, running, and scent games',
    temperature: '10-26°C',
    dos: 'Early training, socialization, regular exercise, mental stimulation, weekly grooming',
    donts: 'Avoid overfeeding, skipping exercise, ignoring their scent drive, leaving alone for extended periods',
  },
  {
    image: "https://imgs.search.brave.com/qADuktXiI5PGSK1Yl6dPYMW6S99agtNoxaFJrkrtjnM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDY2/NzU0NjQwL3Bob3Rv/L3NoaWgtdHp1Lmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1q/MWxmdG1ORWloem8x/akl5a3VabmRRWFY1/MGN1dFFxTVpOZzE2/eXVJYUprPQ",
    name: 'Shih Tzu',
    exercise: '30 minutes to 1 hour of light exercise daily',
    temperature: '15-23°C',
    dos: 'Gentle socialization, light exercise, controlled feeding, daily grooming, facial care',
    donts: 'Avoid overfeeding, overexercising, neglecting grooming, leaving alone for long periods',
  },
  {
    image: "https://imgs.search.brave.com/b5kEU4bx-FaAGg88y6QBAQEr7hBZkb_3PNUSRAhMGdY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzIwLzAzLzQz/LzM2MF9GXzIyMDAz/NDM2Ml95NVN3TE4y/cW1xcU02bXlHcUlY/Q3llZGZLUHBFRlJu/My5qcGc",
    name: 'Rottweiler',
    exercise: '1-2 hours of daily exercise including walks, running, and obedience training',
    temperature: '10-25°C',
    dos: 'Early socialization, consistent training, regular exercise, mental stimulation, weekly grooming',
    donts: 'Avoid harsh training, overfeeding, skipping exercise, neglecting socialization, isolation for long periods',
  },
  {
    image: "https://imgs.search.brave.com/Dwu8wzZHbxhN_hoHmYOk9RO4WM9CrrHuzmK003Z9nR0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGV0c3dvcmxkLmlu/L2Jsb2cvd3AtY29u/dGVudC91cGxvYWRz/LzIwMTcvMDgvc3Ry/YXktY2F0LTItMzAw/eDI2Ny5qcGc",
    name: 'Indian Billi (Indigenous Cat)',
    exercise: '30 minutes to 1 hour of playtime daily',
    temperature: '18-30°C',
    dos: 'Socialization, interactive play, balanced diet, weekly grooming, mental stimulation, regular vet check-ups',
    donts: 'Avoid toxic foods, overfeeding, declawing, ignoring need for independence, skipping vet visits',
  },
  {
    image: "https://imgs.search.brave.com/8aoERgBirla5X7ZRkymBZ_oNH8_MIPCSaYW_VNw1HII/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg3LzcwLzQz/LzM2MF9GXzg3NzA0/MzExX09ScFhNSDZS/QTJUSElhalE5SFZu/UWxpa2p5OU1ndmd1/LmpwZw",
    name: 'Persian Cat',
    exercise: '20-30 minutes of gentle play daily',
    temperature: '18-25°C',
    dos: 'Daily grooming, gentle socialization, light exercise, balanced diet, regular vet check-ups',
    donts: 'Avoid overfeeding, skipping grooming, overheating, neglecting vet visits',
  },
  {
    image: "https://imgs.search.brave.com/cLIbX81wzeTpXl3FIgpbJlY3yclZ92EicUEctI_sSZY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZi5s/dGtjZG4ubmV0L3d3/dy9pbWFnZXMvc3Rk/LXhzLzM1Mjc3Ni0z/NDB4MjI3LWhpbWFs/YXlhbi1jYXQtOTUy/MTE4NTkyLmpwZw",
    name: 'Himalayan Cat',
    exercise: '20-30 minutes of daily play',
    temperature: '18-24°C',
    dos: 'Daily grooming, gentle socialization, light exercise, balanced diet, mental stimulation',
    donts: 'Avoid overfeeding, skipping grooming, overheating, leaving alone for long periods',
  },
  {
    image: "https://imgs.search.brave.com/Pe6dXLJvb5x7ptWsFaVo3iNdMc0c0AGUbx_GS004o18/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/em9vcGx1cy5jby51/ay9tYWdhemluZS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxOC8w/Mi9mb3RvbGlhXzgy/NzE5OTc1LTc2OHg1/ODIuanBn",
    name: 'Bengal Cat',
    exercise: '1-2 hours of exercise daily',
    temperature: '15-26°C',
    dos: 'Ample physical and mental stimulation, socialization, balanced diet, weekly grooming',
    donts: 'Avoid neglecting exercise, overfeeding, leaving alone for long periods, skipping vet visits',
  },
  {
    image: "https://imgs.search.brave.com/Ad1WxcX7jtDmj5x3IdS2-sXNaXIhB04bL4ODTf5pAAA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI5/NTg3Mjg3OC9waG90/by9icml0aXNoLWJs/dWUtc2hvcnRoYWly/LXBldC1jYXQtbG9v/a2luZy11cC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9WVpz/Y0pUTEM4WlFRcldX/YUp2MVVQRUkxUkZI/amFkYTVjUjlEeHdz/YzRidz0",
    name: 'British Shorthair Cat',
    exercise: '20-30 minutes of daily play',
    temperature: '15-25°C',
    dos: 'Weekly grooming, gentle socialization, balanced diet, mental stimulation, regular vet check-ups',
    donts: 'Avoid overfeeding, neglecting grooming, skipping exercise, leaving alone for too long',
  },
];

// Update the petData array to ensure all pets have the same properties
const updatedPetData = petData.map(pet => ({
  ...pet,
  exercise: pet.exercise || "N/A",
  temperature: pet.temperature || "N/A",
  dos: pet.dos || "N/A",
  donts: pet.donts || "N/A"
}));

const PetCare = () => {
  const [selectedPetType, setSelectedPetType] = useState("All");

  const filteredPets = selectedPetType === "All" 
    ? updatedPetData 
    : updatedPetData.filter(pet => {
        if (selectedPetType === "Dog") {
          return ["Golden Retriever", "Labrador", "German Shepherd", "Pug", "Beagle", "Rottweiler"].includes(pet.name);
        } else if (selectedPetType === "Cat") {
          return ["Siamese Cat", "Indian Billi (Indigenous Cat)", "Persian Cat", "Himalayan Cat", "Bengal Cat", "British Shorthair Cat"].includes(pet.name);
        }
        return false;
      });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#AD49E1] to-[#EBD3F8]">
      {/* Header */}
      <div className="relative w-full overflow-hidden h-80 md:h-96 lg:h-[28rem]">
        <img
          src="https://images.pexels.com/photos/5849096/pexels-photo-5849096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Pet Care Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4 animate-fade-in-down">
            Gentle Care for Your Furry Friends
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-white text-center animate-fade-in-up">
          Find Care Tips for Your Pet
        </h2>
        
        {/* Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-fade-in">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Pet Type</label>
            <select
              value={selectedPetType}
              onChange={(e) => setSelectedPetType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7360DF]"
            >
              <option value="All">All Pets</option>
              <option value="Dog">Dogs</option>
              <option value="Cat">Cats</option>
            </select>
          </div>
        </div>

        {/* Pet Cards */}
        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPets.map((pet, index) => (
              <div key={index} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <PetCard pet={pet} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-lg animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-800">No pets found</h2>
            <p className="text-gray-600 mt-4">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetCare;
