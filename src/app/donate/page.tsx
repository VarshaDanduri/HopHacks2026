'use client';

import { useState } from 'react';
import TrustScore from '@/components/TrustScore';
import { useRouter } from 'next/navigation';

interface DonationForm {
  amount: string;
  frequency: 'one-time' | 'monthly' | 'yearly';
  donorName: string;
  email: string;
  isAnonymous: boolean;
  addTaxReceipt: boolean;
}

export default function DonatePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<DonationForm>({
    amount: '',
    frequency: 'one-time',
    donorName: '',
    email: '',
    isAnonymous: false,
    addTaxReceipt: true
  });

  // Mock charity data
  const charity = {
    name: 'Doctors Without Borders',
    description: 'International medical humanitarian organization providing emergency medical care worldwide.',
    trustScore: 94,
    isTaxDeductible: true,
    website: 'https://www.doctorswithoutborders.org'
  };

  const handleInputChange = (field: keyof DonationForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Simulate donation processing
    alert('Donation processed successfully! Thank you for your generosity.');
    router.push('/dashboard');
  };

  const getFrequencyMultiplier = () => {
    switch (formData.frequency) {
      case 'monthly': return 12;
      case 'yearly': return 1;
      default: return 1;
    }
  };

  const getTotalAmount = () => {
    const amount = parseFloat(formData.amount) || 0;
    return amount * getFrequencyMultiplier();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Make a Donation</h1>
          <p className="text-lg text-gray-600">Support a verified charity with confidence</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Charity Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Charity Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{charity.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{charity.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Trust Score:</span>
                  <TrustScore score={charity.trustScore} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tax Status:</span>
                  <span className={`text-sm font-medium ${
                    charity.isTaxDeductible ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {charity.isTaxDeductible ? 'Tax-Deductible' : 'Not Tax-Deductible'}
                  </span>
                </div>

                {charity.isTaxDeductible && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      <span className="font-semibold">✓ Tax-Deductible:</span> Your donation may be eligible for tax deduction.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= stepNumber
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div className={`w-16 h-1 mx-2 ${
                        step > stepNumber ? 'bg-green-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Amount Selection */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Choose Amount</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Donation Amount
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {[25, 50, 100, 250, 500, 1000].map(amount => (
                        <button
                          key={amount}
                          onClick={() => handleInputChange('amount', amount.toString())}
                          className={`p-3 border rounded-lg font-semibold transition-colors ${
                            formData.amount === amount.toString()
                              ? 'border-green-600 bg-green-50 text-green-600'
                              : 'border-gray-300 hover:border-green-300'
                          }`}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                      placeholder="Enter custom amount"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequency
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'one-time', label: 'One-time' },
                        { value: 'monthly', label: 'Monthly' },
                        { value: 'yearly', label: 'Yearly' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => handleInputChange('frequency', option.value)}
                          className={`p-3 border rounded-lg font-semibold transition-colors ${
                            formData.frequency === option.value
                              ? 'border-green-600 bg-green-50 text-green-600'
                              : 'border-gray-300 hover:border-green-300'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.amount && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Impact:</span>
                        <span className="text-lg font-bold text-green-600">
                          ${getTotalAmount().toLocaleString()}
                          {formData.frequency !== 'one-time' && ' per year'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Donor Information */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Donor Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.donorName}
                        onChange={(e) => handleInputChange('donorName', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isAnonymous}
                        onChange={(e) => handleInputChange('isAnonymous', e.target.checked)}
                        className="mr-3 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Make this donation anonymous</span>
                    </label>

                    {charity.isTaxDeductible && (
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.addTaxReceipt}
                          onChange={(e) => handleInputChange('addTaxReceipt', e.target.checked)}
                          className="mr-3 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Send tax receipt to email</span>
                      </label>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Payment & Confirmation */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Payment & Confirmation</h2>
                  
                  {/* Donation Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Donation Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span>${parseFloat(formData.amount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Frequency:</span>
                        <span className="capitalize">{formData.frequency.replace('-', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Donor:</span>
                        <span>{formData.isAnonymous ? 'Anonymous' : formData.donorName}</span>
                      </div>
                      {charity.isTaxDeductible && (
                        <div className="flex justify-between text-green-600">
                          <span>Tax Receipt:</span>
                          <span>{formData.addTaxReceipt ? 'Yes' : 'No'}</span>
                        </div>
                      )}
                      <hr className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${getTotalAmount().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <div className="border border-gray-300 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">💳</span>
                          <span>Credit/Debit Card</span>
                        </div>
                        <span className="text-sm text-gray-500">Secure payment processing</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <span className="text-green-600 mr-2">🔒</span>
                      <div>
                        <h4 className="font-semibold text-green-800">Secure Donation</h4>
                        <p className="text-sm text-green-700 mt-1">
                          Your payment information is encrypted and secure. We never store your payment details.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Back
                </button>

                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    disabled={step === 1 && !formData.amount}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Complete Donation
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
