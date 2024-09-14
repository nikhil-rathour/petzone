import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col justify-center items-center space-y-8 text-center">
        
        {/* Quick Links Section */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-yellow-500 transition-colors">Home</a></li>
            <li><a href="/Aboutus" className="hover:text-yellow-500 transition-colors">About Us</a></li>
          </ul>
        </div>

        {/* About Section with Image */}
        <div className="w-full">
          <img src="https://th.bing.com/th/id/OIP.k1U-SFSZlXTccE5WvQzDFQHaEo?rs=1&pid=ImgDetMain" alt="Paw Logo" className="mx-auto rounded-full h-20 mb-4 border-2 border-yellow-500"/>
          <p className="text-gray-400">
            We're dedicated to helping you care for your furry friends with expert tips, resources, and a loving community.
          </p>
        </div>

        {/* Social Section with Icons */}
        {/* <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <div className="flex justify-center space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 transition-colors text-3xl"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 transition-colors text-3xl"><i className="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com/nikhil_.rathour?igsh=djRoMWF5eGZpZDly" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 transition-colors text-3xl"><i className="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com/in/nikhil-rathour-8a56302a6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 transition-colors text-3xl"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <img src="https://th.bing.com/th/id/OIP.1-p_Yl1bQq1tZdWMEB1l-QHaFX?w=590&h=428&rs=1&pid=ImgDetMain" alt="Cute Paw" className="mx-auto w-20 h-20 mt-5 rounded-full border-2 border-yellow-500"/>
        </div> */}
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center">
        <p><a href='https://github.com/Yugsingh05/hack'>&copy; {new Date().getFullYear()} PetZone. All Rights Reserved.</a></p>
      </div>
    </footer>
  );
};

export default Footer;
