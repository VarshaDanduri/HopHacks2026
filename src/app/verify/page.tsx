'use client';

import { useState } from 'react';
import TrustScore from '@/components/TrustScore';

interface VerificationResult {
  isValid: boolean;
  charityName?: string;
  trustScore?: number;
  isTaxDeductible?: boolean;
  description?: string;
  website?: string;
  warnings?: string[];
  recommendations?: string[];
}

export default function VerifyPage() {
  const [url, setUrl] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (!url.trim()) {
      setError('Please enter a fundraiser URL');
      return;
    }

    setIsVerifying(true);
    setError('');
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      // Mock verification logic based on URL patterns
      const mockResult: VerificationResult = {
        isValid: true,
        charityName: 'American Red Cross',
        trustScore: 89,
        isTaxDeductible: true,
        description: 'Emergency relief organization providing disaster response and blood services.',
        website: 'https://www.redcross.org',
        warnings: [],
        recommendations: [
          'This is a legitimate charity with high trust score',
          'Donations are tax-deductible',
          'Consider setting up recurring donations for ongoing impact'
        ]
      };

      // Simulate different results based on URL
      if (url.includes('gofundme') || url.includes('kickstarter')) {
        mockResult.isTaxDeductible = false;
        mockResult.warnings = ['This appears to be a crowdfunding platform, not a registered charity'];
        mockResult.recommendations = [
          'Verify the fundraiser organizer directly',
          'Check if the cause is legitimate',
          'Note: Donations may not be tax-deductible'
        ];
      } else if (url.includes('suspicious') || url.includes('fake')) {
        mockResult.isValid = false;
        mockResult.warnings = ['This fundraiser appears to be fraudulent'];
        mockResult.recommendations = [
          'Do not donate to this fundraiser',
          'Report suspicious activity to platform administrators',
          'Consider donating to verified charities instead'
        ];
      }

      setResult(mockResult);
      setIsVerifying(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Fundraiser</h1>
          <p className="text-lg text-gray-600">
            Paste a fundraiser URL to check its legitimacy and tax-deductible status
          </p>
        </div>

        {/* Verification Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Fundraiser URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.gofundme.com/example-fundraiser"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              />
            </div>

            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isVerifying ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                'Verify Fundraiser'
              )}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Verification Result */}
        {result && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification Results</h2>
              
              {result.isValid ? (
                <div className="space-y-6">
                  {/* Charity Info */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{result.charityName}</h3>
                      {result.trustScore && <TrustScore score={result.trustScore} size="lg" />}
                    </div>
                    
                    <p className="text-gray-600 mb-4">{result.description}</p>
                    
                    <div className="flex flex-wrap gap-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        result.isTaxDeductible 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        <span className="mr-1">💰</span>
                        {result.isTaxDeductible ? 'Tax-Deductible' : 'Not Tax-Deductible'}
                      </span>
                      
                      {result.website && (
                        <a
                          href={result.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                        >
                          <span className="mr-1">🌐</span>
                          Official Website
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Warnings */}
                  {result.warnings && result.warnings.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Warnings</h4>
                      <ul className="list-disc list-inside text-yellow-700 space-y-1">
                        {result.warnings.map((warning, index) => (
                          <li key={index}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommendations */}
                  {result.recommendations && result.recommendations.length > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">💡 Recommendations</h4>
                      <ul className="list-disc list-inside text-green-700 space-y-1">
                        {result.recommendations.map((recommendation, index) => (
                          <li key={index}>{recommendation}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                      Proceed to Donation
                    </button>
                    <button className="flex-1 border-2 border-green-600 text-green-600 py-3 px-6 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                      Save for Later
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-2">🚨</span>
                    <h3 className="text-xl font-semibold text-red-800">Fundraiser Not Verified</h3>
                  </div>
                  
                  {result.warnings && result.warnings.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-red-800 mb-2">Issues Found:</h4>
                      <ul className="list-disc list-inside text-red-700 space-y-1">
                        {result.warnings.map((warning, index) => (
                          <li key={index}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.recommendations && result.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">Recommendations:</h4>
                      <ul className="list-disc list-inside text-red-700 space-y-1">
                        {result.recommendations.map((recommendation, index) => (
                          <li key={index}>{recommendation}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 How Verification Works</h3>
          <div className="grid md:grid-cols-2 gap-4 text-blue-800">
            <div>
              <h4 className="font-semibold mb-2">What We Check:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Charity registration status</li>
                <li>Tax-deductible eligibility</li>
                <li>Financial transparency</li>
                <li>Regulatory compliance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Trust Score Factors:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Financial reporting quality</li>
                <li>Impact measurement</li>
                <li>Administrative efficiency</li>
                <li>Public accountability</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
