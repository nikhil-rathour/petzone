import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false); // State to control menu visibility
  const [activeItem, setActiveItem] = useState('Home'); // State to track the active nav item
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const nav = [
    { name: "Home", slug: "/" , activeItem : true},
    { name: "Sell your pet", slug: "/sell",activeItem : true },
    { name: "Pet Food", slug: "/petfood",activeItem : true },
    { name: "Pet Care", slug: "/petcare",activeItem : true },
    { name: "Adopt", slug: "/adopt",activeItem : true },
    { name: "Help", slug: "/help",activeItem : true},
    {
      name : "About" , slug : "/aboutus", activeItem : true
    },
    { name: "Profile", slug: "/profile",activeItem : authStatus },
    {name : "Login" , slug : "/login",activeItem : !authStatus},
    // {
    //   name : "Signup" , slug : "signup", activeItem :!authStatus
    // },
    
  ];

  const handleClick = (slug, name) => {
    navigate(slug);
    setActiveItem(name); // Set the clicked item as active
    setIsOpen(false); // Close the menu after navigation
  };

  return (
    <header className="bg-gradient-to-r from-[#7A1CAC] to-[#2E073F] shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto flex flex-wrap justify-between items-center py-2 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center mr-4">
          <img
            src="https://i.pinimg.com/736x/58/d0/de/58d0de7d47d69bacfe4eee34d984179d.jpg"
            alt="PetZone Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 mr-2 rounded-full shadow-md"
          />
          <div className="text-white text-2xl sm:text-3xl font-bold tracking-wide">PetZone</div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-wrap justify-center space-x-2 xl:space-x-4">
          {nav.map((page) => 
            page.activeItem ? (
              <button
                key={page.name}
                className={`text-sm xl:text-base transition duration-300 ease-in-out px-2 py-1 rounded-md ${
                  activeItem === page.name
                    ? "bg-white text-[#4F1787] font-semibold shadow-md"
                    : "text-white hover:bg-white hover:bg-opacity-20"
                }`}
                onClick={() => handleClick(page.slug, page.name)}
              >
                {page.name}
              </button>
            ) : null
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none hover:bg-white hover:bg-opacity-20 p-2 rounded-md transition duration-300 ease-in-out"
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-gradient-to-r from-[#7A1CAC] to-[#2E073F] absolute top-full left-0 right-0 shadow-lg">
          <div className="flex flex-col space-y-2 p-4">
            {nav.map((page) => (
              page.activeItem ? (
                <button
                  key={page.name}
                  className={`text-base transition duration-300 ease-in-out px-4 py-2 rounded-md ${
                    activeItem === page.name
                      ? "bg-white text-[#4F1787] font-semibold"
                      : "text-white hover:bg-white hover:bg-opacity-20"
                  }`}
                  onClick={() => handleClick(page.slug, page.name)}
                >
                  {page.name}
                </button>
              ) : null
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
