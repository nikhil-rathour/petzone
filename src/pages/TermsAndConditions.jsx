import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-purple-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">Terms and Conditions</h1>
        
        <h2 className="text-2xl font-semibold text-purple-500 mt-6 mb-4">Safety Measures Before Buying a Pet</h2>
        
        <ol className="list-decimal pl-6 space-y-4">
          <li>Research the breed thoroughly to ensure it fits your lifestyle and living situation.</li>
          <li>Verify the seller's credentials and ask for references from previous buyers.</li>
          <li>Request and review the pet's medical history, including vaccinations and any genetic tests.</li>
          <li>Ensure the pet has been microchipped and registered.</li>
          <li>Visit the pet in person before making a decision, if possible.</li>
          <li>Observe the pet's behavior and interaction with people and other animals.</li>
          <li>Check the living conditions where the pet was raised.</li>
          <li>Ask about the pet's diet and continue with the same food initially to avoid digestive issues.</li>
          <li>Ensure you have all necessary supplies before bringing the pet home.</li>
          <li>Schedule a vet check-up within the first week of ownership.</li>
          <li>Understand the financial commitment involved in pet ownership.</li>
          <li>Be prepared for the time commitment required for training and care.</li>
          <li>Familiarize yourself with local pet laws and licensing requirements.</li>
          <li>Consider pet insurance for unexpected medical expenses.</li>
          <li>Ensure all family members are on board with the decision to get a pet.</li>
        </ol>

        <h2 className="text-2xl font-semibold text-purple-500 mt-8 mb-4">Additional Terms</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>PetZone is a platform that connects buyers and sellers. We are not responsible for the actions of individual users.</li>
          <li>Users must be 18 years or older to create an account and use our services.</li>
          <li>All information provided must be accurate and up-to-date.</li>
          <li>Users are prohibited from posting false or misleading information about pets.</li>
          <li>PetZone reserves the right to remove any listing that violates our policies.</li>
          <li>Users are responsible for complying with all applicable laws and regulations regarding pet ownership and sales.</li>
          <li>PetZone is not liable for any disputes between buyers and sellers.</li>
          <li>By using our platform, you agree to treat all animals with respect and ensure their well-being.</li>
        </ul>

        <p className="mt-8 text-gray-600">
          By using PetZone, you acknowledge that you have read, understood, and agree to these terms and conditions.
        </p>

        <Link to="/signup" className="block mt-8 text-center bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200">
          Back to Sign Up
        </Link>
      </div>
    </div>
  );
};

export default TermsAndConditions;
