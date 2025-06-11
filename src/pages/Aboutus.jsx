import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#AD49E1] to-[#EBD3F8]">
      {/* Header */}
      <div className="relative w-full overflow-hidden h-80 md:h-96 lg:h-[28rem]">
        <img
          src="https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Pet Zone Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
          Our Mission: Happy Pets, Happy Lives
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-base md:text-lg text-gray-700 leading-relaxed space-y-8">
            <p className="md:leading-loose">
              Welcome to <span className="font-bold text-[#e63579]">PetZone</span>, your trusted companion in the world of pet care and adoption. We believe that every pet deserves a loving home, and every pet owner deserves the best resources and support to care for their furry friends.
            </p>
            <p className="md:leading-loose">
              At <span className="font-bold text-[#e63579]">PetZone</span>, we offer a comprehensive platform that connects pet lovers, adopters, and sellers, making the process of finding, adopting, or selling pets as smooth as possible. Whether you're looking for advice on pet care, searching for the perfect pet food, or hoping to adopt a new family member, PetZone is here to guide you every step of the way.
            </p>

            <div className="bg-[#F2AFEF] bg-opacity-20 p-6 rounded-lg shadow-md">
              <h3 className="text-3xl font-bold text-[#e63579] mb-4">Our Mission:</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-800">
                <li>To create a community where pets and their owners can thrive.</li>
                <li>To provide valuable resources and tips for pet care.</li>
                <li>To support the adoption of pets, ensuring they find loving homes.</li>
                <li>To offer a platform where pet owners can connect, share, and learn from each other.</li>
              </ul>
            </div>

            <div className="bg-[#C499F3] bg-opacity-20 p-6 rounded-lg shadow-md">
              <h3 className="text-3xl font-bold text-[#e63579] mb-4">Why Choose PetZone?</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-800">
                <li><span className="font-bold text-[#e63579]">Comprehensive Resources:</span> From pet food to care tips, we've got everything you need.</li>
                <li><span className="font-bold text-[#e63579]">Community Support:</span> Join a community of pet lovers who share your passion.</li>
                <li><span className="font-bold text-[#e63579]">Easy Adoption Process:</span> Simplify the process of finding and adopting your next pet.</li>
                <li><span className="font-bold text-[#e63579]">Trusted Sellers:</span> Connect with reputable sellers who care about the well-being of their pets.</li>
              </ul>
            </div>

            <p className="mt-10 text-lg font-medium text-gray-800 text-center">
              Join us at <span className="font-bold text-[#e63579]">PetZone</span>, where we bring pet lovers and their beloved companions together in a caring, supportive, and informed environment. Let's make every pet's life better, one paw at a time.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-xl font-medium text-white mb-4">
            Join us at PetZone and make a difference in pets' lives!
          </p>
          <button 
            className="bg-[#7360DF] text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors duration-300 text-lg font-semibold"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
