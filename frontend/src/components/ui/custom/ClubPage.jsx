import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '@/components/footer';
import { Header } from "@/components/ui/custom/Header";
import Club from "@/components/ui/custom/Club";

export default function ClubPage() {
  const [clubNames, setClubNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchClubNames = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/clubs'); // Ensure this matches your Django endpoint
        setClubNames(response.data);
      } catch (error) {
        console.error('Error fetching club names:', error);
      }
    };

    fetchClubNames();
  }, []);

  const filteredClubs = clubNames.filter((clubs) =>
    clubs.club_name.toLowerCase().includes(searchTerm.toLowerCase())
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
            {filteredClubs.map((clubs, index) => (
              <div key={index} className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
                <Club clubname={clubs.club_name} clubId={clubs.id} clubImage={clubs.club_image} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
