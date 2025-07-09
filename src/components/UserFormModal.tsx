'use client';

import { useState } from 'react';
import { UserService } from '@/lib/firestore';

interface UserFormData {
  name: string;
  studio_name: string;
  email: string;
  mobile: string;
  place: string;
}

interface UserFormProps {
  isModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}

export default function UserForm({ isModal = false, isOpen = true, onClose, onSuccess }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    studio_name: '',
    email: '',
    mobile: '',
    place: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await UserService.createUser(formData);
      setMessage('🎉 Welcome aboard! You\'re now part of our creative community!');
      
      // Set localStorage to prevent showing again (only for modal)
      if (isModal) {
        localStorage.setItem('userFormSubmitted', 'true');
      }
      
      // Reset form
      setFormData({
        name: '',
        studio_name: '',
        email: '',
        mobile: '',
        place: ''
      });
      
      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
      
      // Close modal after a short delay (only for modal)
      if (isModal && onClose) {
        setTimeout(() => {
          onClose();
        }, 2000);
      }
      
    } catch (error) {
      setMessage(`❌ Oops! Something went wrong: ${error instanceof Error ? error.message : 'Please try again'}`);
    } finally {
      setLoading(false);
    }
  };

  // If modal and not open, don't render
  if (isModal && !isOpen) return null;

  // Modal version
  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] rounded-2xl shadow-2xl border border-purple-900/40 p-6 w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              🚀 Unlock Premium Access!
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Join our exclusive community of creative professionals! Get instant access to premium wedding invitation templates, 
              exclusive discounts, and priority support. Your journey to creating stunning wedding memories starts here!
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full bg-[#18122B]/80 border border-purple-700/40 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            
            <input
              type="text"
              name="studio_name"
              placeholder="Studio/Business Name"
              value={formData.studio_name}
              onChange={handleInputChange}
              required
              className="w-full bg-[#18122B]/80 border border-purple-700/40 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full bg-[#18122B]/80 border border-purple-700/40 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              className="w-full bg-[#18122B]/80 border border-purple-700/40 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            
            <input
              type="text"
              name="place"
              placeholder="City/Place"
              value={formData.place}
              onChange={handleInputChange}
              required
              className="w-full bg-[#18122B]/80 border border-purple-700/40 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {loading ? '✨ Setting up your account...' : '🎯 Get Premium Access Now!'}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-4 rounded-md text-center ${
              message.includes('❌') 
                ? 'bg-red-900/20 text-red-300 border border-red-700/40' 
                : 'bg-green-900/20 text-green-300 border border-green-700/40'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Regular form version (for admin panel or other uses)
  return (
    <div className="bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] rounded-2xl shadow-2xl border border-purple-900/40 p-6">
      <h2 className="text-2xl font-bold mb-6 text-purple-300">Add New User</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full bg-[#18122B]/80 border border-purple-700/40 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
        
        <input
          type="text"
          name="studio_name"
          placeholder="Studio Name"
          value={formData.studio_name}
          onChange={handleInputChange}
          required
          className="w-full bg-[#18122B]/80 border border-purple-700/40 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full bg-[#18122B]/80 border border-purple-700/40 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
        
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleInputChange}
          required
          className="w-full bg-[#18122B]/80 border border-purple-700/40 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
        
        <input
          type="text"
          name="place"
          placeholder="City/Place"
          value={formData.place}
          onChange={handleInputChange}
          required
          className="w-full bg-[#18122B]/80 border border-purple-700/40 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Add User'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-md ${
          message.includes('❌') 
            ? 'bg-red-900/20 text-red-300 border border-red-700/40' 
            : 'bg-green-900/20 text-green-300 border border-green-700/40'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
} 