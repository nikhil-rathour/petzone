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
    <div className="min-h-screen bg-gradient-to-br from-[#C499F3] via-[#F2AFEF] to-[#7360DF] p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#e63579]">Help NGOs 🐾</h1>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Location Selector */}
            <select
              className="bg-[#7360DF] text-white border border-[#7360DF] p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-[#7360DF]"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredNGOs.length > 0 ? (
            filteredNGOs.map((ngo) => (
              <div
                key={ngo.id}
                className="bg-gradient-to-b from-purple-50 to-pink-50 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={ngo.photo}
                  alt={ngo.name}
                  className="w-full h-48 object-cover rounded-xl mb-4 shadow-md"
                />
                <h3 className="text-2xl font-bold text-[#e63579] mb-2">{ngo.name} 🐕</h3>
                <p className="text-gray-700 mb-4">{ngo.description}</p>
                <p className="text-sm text-gray-600 mb-2">
                  Location: <a href={ngo.mapLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{ngo.location}</a>
                </p>
                <p className="text-sm text-gray-600">Contact: {ngo.contact}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700 col-span-2 text-center text-lg">No NGOs available for the selected location.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Help;
