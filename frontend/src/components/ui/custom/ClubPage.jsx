import React, { useState } from 'react';
import Footer from '@/components/footer';
import { Header } from "@/components/ui/custom/Header";
import Club from "@/components/ui/custom/Club";

export default function ClubPage() {
  const clubNames = [
    { id: 1, name: "Kathmandu University Computer Club" },
    { id: 2, name: "Kathmandu University Architecture Student Society" },
    { id: 3, name: "Kathmandu University Robotics Club" },
    { id: 4, name: "Kathmandu University Civil Engineering Club" },
    { id: 5, name: "Society of Electrical & Electronic Engineering" },
    { id: 6, name: "Kathmandu University Society of Music and Culture" },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClubs = clubNames.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="md:flex md:mx-auto md:w-3/4 overflow-y-auto flex-grow pt-3">
        <div className="w-full min-h-screen p-4">
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <input
              type="search"
              placeholder="Search club..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Subscription Forms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {filteredClubs.map((club, index) => (
              <div key={index} className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
                <Club clubname={club.name} clubId={club.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
