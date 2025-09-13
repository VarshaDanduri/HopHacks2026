'use client';

import { useState } from 'react';
import TrustScore from '@/components/TrustScore';
import { mockCharities, causes, locations } from '@/data/mockData';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCause, setSelectedCause] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [sortBy, setSortBy] = useState('trustScore');

  const filteredCharities = mockCharities
    .filter(charity => {
      const matchesSearch = charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           charity.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCause = selectedCause === 'All' || charity.cause === selectedCause;
      const matchesLocation = selectedLocation === 'All' || charity.location === selectedLocation;
      
      return matchesSearch && matchesCause && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'trustScore':
          return b.trustScore - a.trustScore;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'location':
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Charities</h1>
          <p className="text-lg text-gray-600">Find and verify legitimate charities to support</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Charities
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or description..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Cause Filter */}
            <div>
              <label htmlFor="cause" className="block text-sm font-medium text-gray-700 mb-2">
                Cause
              </label>
              <select
                id="cause"
                value={selectedCause}
                onChange={(e) => setSelectedCause(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {causes.map(cause => (
                  <option key={cause} value={cause}>{cause}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                id="location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-4 flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <div className="flex space-x-2">
              {[
                { value: 'trustScore', label: 'Trust Score' },
                { value: 'name', label: 'Name' },
                { value: 'location', label: 'Location' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    sortBy === option.value
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Found {filteredCharities.length} charities matching your criteria
          </p>
        </div>

        {/* Charity Cards */}
        <div className="grid gap-6">
          {filteredCharities.map(charity => (
            <div key={charity.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{charity.name}</h3>
                    <TrustScore score={charity.trustScore} />
                  </div>
                  
                  <p className="text-gray-600 mb-4">{charity.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <span className="mr-1">📍</span>
                      {charity.location}
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">🎯</span>
                      {charity.cause}
                    </span>
                    <span className={`flex items-center font-medium ${
                      charity.isTaxDeductible ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <span className="mr-1">💰</span>
                      {charity.isTaxDeductible ? 'Tax-Deductible' : 'Not Tax-Deductible'}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 md:ml-6">
                  <a
                    href={charity.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    Visit Website
                  </a>
                  <button className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCharities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No charities found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
