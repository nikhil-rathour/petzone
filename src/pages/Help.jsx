import React, { useState } from 'react';

const Help = () => {
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Sample NGO data with Google Maps links
  const ngosData = [
    {
      id: 1,
      name: 'Panjrapol Sanstha Ahmedabad',
      location: 'Ahmedabad',
      contact: '7926301052',
      description: 'પાંજરાપોળ સંસ્થા અમદાવાદ - Animal protection organization.',
      photo: 'https://lh5.googleusercontent.com/p/AF1QipNa0fPzSXs5bq0gzPgKhtuhkILn-bM1oduEwnYz=w408-h306-k-no',
      mapLink: 'https://maps.app.goo.gl/KbHX37bsygdaf59S8',
    },
    {
      id: 2,
      name: 'Jivdaya Charitable Trust',
      location: 'Ahmedabad',
      contact: '9924418184',
      description: 'જીવદયા ચેરિટેબલ ટ્રસ્ટ Animal hospital·.',
      photo: 'https://lh5.googleusercontent.com/p/AF1QipMhSE7xPUtfXoLWOaQvxEYRPHr336ks-jwfVSu8=w426-h240-k-no',
      mapLink: 'https://maps.app.goo.gl/5jAj3q8ECB9ST47bA',
    },
    {
      id: 3,
      name: 'Maa Gauri Gaushala Trust',
      location: 'Rajkot',
      contact: '9574645298',
      description: 'Animal protection organization',
      photo: 'https://lh5.googleusercontent.com/p/AF1QipMVq9-R7BJG42_nmHbn62XTaLZ_Jg-ShJZqWTgy=w408-h544-k-no',
      mapLink: 'https://maps.app.goo.gl/75Pp2m6Dd8urbCBY8',
    },
    {
      id: 4,
      name: 'GOAL FOUNDATION Rajkot',
      location: 'Rajkot',
      contact: '9924112200',
      description: 'ગોલ ફાઉન્ડેશન રાજકોટ - Animal hospital.',
      photo: 'https://lh3.googleusercontent.com/iCTYFB__IN5jCtk2WESnD16FNOgBjYiLNZFopntJAwedc2_j56lQIZEgEAa5DWSBfeNCO-iH7tQI6Qaq24CSsuycvg=w256-rw',
      mapLink: 'https://maps.app.goo.gl/XHQYLC2RZmUgUyARA',
    },
    {
      id: 5,
      name: 'Maa Animal Foundation',
      location: 'Gandhinagar',
      contact: '9712577277',
      description: 'Supporting pet adoption and providing pet care resources in San Francisco.',
      photo: 'https://lh5.googleusercontent.com/p/AF1QipPrwwPts7h8F2JbarGD-aqy8qyT6WSraxb5HiW9=w408-h725-k-no',
      mapLink: 'https://maps.app.goo.gl/8dyPD7tR3VQMfpjK6',
    },
    {
      id: 6,
      name: 'The Gods Gift Foundation Animal Helpline',
      location: 'Gandhinagar',
      contact: '09636901352',
      description: 'Non-profit organization.',
      photo: 'https://thegodsgiftfoundation.com/wp-content/uploads/2022/01/IMG-20201218-WA0008.jpg',
      mapLink: 'https://maps.app.goo.gl/2P7euCcPBewgT8dW8',
    },
  ];

  // Filter NGOs based on selected location
  const filteredNGOs = ngosData.filter((ngo) => {
    return selectedLocation === 'All' || ngo.location === selectedLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#AD49E1] to-[#EBD3F8]">
      {/* Header */}
      <div className="relative w-full overflow-hidden h-80 md:h-96 lg:h-[28rem]">
        <img
          src="https://images.pexels.com/photos/1350591/pexels-photo-1350591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Help NGOs Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
          Support When You Need It, for Pets You Love
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-white text-center">
          Find NGOs Near You
        </h2>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-center">
            <select
              className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7360DF]"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="All">All Locations</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Gandhinagar">Gandhinagar</option>
            </select>
          </div>
        </div>

        {/* NGO Cards */}
        {filteredNGOs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNGOs.map((ngo) => (
              <div
                key={ngo.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={ngo.photo}
                  alt={ngo.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{ngo.name}</h3>
                  <p className="text-gray-600 mb-4">{ngo.description}</p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Location:</span>{' '}
                    <a href={ngo.mapLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      {ngo.location}
                    </a>
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-medium">Contact:</span> {ngo.contact}
                  </p>
                  <a
                    href={ngo.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#7360DF] text-white text-center py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-300"
                  >
                    View on Map
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800">No NGOs available</h2>
            <p className="text-gray-600 mt-4">Try selecting a different location.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Help;
