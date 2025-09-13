'use client';

import { useState } from 'react';
import TrustScore from '@/components/TrustScore';
import { mockDonations } from '@/data/mockData';

interface SavedCharity {
  id: string;
  name: string;
  description: string;
  trustScore: number;
  isTaxDeductible: boolean;
  dateAdded: string;
}

// Mock saved charities data
const mockSavedCharities: SavedCharity[] = [
  {
    id: '1',
    name: 'American Red Cross',
    description: 'Emergency relief organization providing disaster response and blood services.',
    trustScore: 89,
    isTaxDeductible: true,
    dateAdded: '2024-01-05'
  },
  {
    id: '2',
    name: 'UNICEF',
    description: 'United Nations agency providing humanitarian aid to children worldwide.',
    trustScore: 91,
    isTaxDeductible: true,
    dateAdded: '2024-01-12'
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'donations' | 'saved' | 'settings'>('donations');

  const totalDonated = mockDonations
    .filter(d => d.status === 'completed')
    .reduce((sum, d) => sum + d.amount, 0);

  const monthlyDonations = mockDonations
    .filter(d => d.frequency === 'monthly' && d.status === 'completed')
    .reduce((sum, d) => sum + d.amount, 0);

  const taxDeductibleTotal = mockDonations
    .filter(d => d.status === 'completed' && d.isTaxDeductible)
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-lg text-gray-600">Manage your donations and saved charities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Donated</p>
                <p className="text-2xl font-bold text-gray-900">${totalDonated.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-2xl">📅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Giving</p>
                <p className="text-2xl font-bold text-gray-900">${monthlyDonations.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-2xl">📋</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tax-Deductible</p>
                <p className="text-2xl font-bold text-gray-900">${taxDeductibleTotal.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'donations', label: 'Donations', count: mockDonations.length },
                { id: 'saved', label: 'Saved Charities', count: mockSavedCharities.length },
                { id: 'settings', label: 'Settings', count: null }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Donations Tab */}
            {activeTab === 'donations' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Your Donations</h2>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Make New Donation
                  </button>
                </div>

                <div className="space-y-4">
                  {mockDonations.map(donation => (
                    <div key={donation.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{donation.charityName}</h3>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span>${donation.amount.toLocaleString()}</span>
                            <span className="capitalize">{donation.frequency.replace('-', ' ')}</span>
                            <span>{new Date(donation.date).toLocaleDateString()}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              donation.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : donation.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {donation.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {donation.isTaxDeductible && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Tax-Deductible
                            </span>
                          )}
                          {donation.taxReceiptSent && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              Receipt Sent
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Charities Tab */}
            {activeTab === 'saved' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Saved Charities</h2>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Browse Charities
                  </button>
                </div>

                <div className="grid gap-4">
                  {mockSavedCharities.map(charity => (
                    <div key={charity.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{charity.name}</h3>
                            <TrustScore score={charity.trustScore} />
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{charity.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Saved on {new Date(charity.dateAdded).toLocaleDateString()}</span>
                            {charity.isTaxDeductible && (
                              <span className="text-green-600 font-medium">Tax-Deductible</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View Details
                          </button>
                          <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                            Donate
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Notifications
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3 h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-700">Donation confirmations</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3 h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-700">Tax receipt notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3 h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-700">Charity updates and news</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Privacy Settings
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3 h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-700">Keep donation history private</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3 h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-700">Allow charities to contact me</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
