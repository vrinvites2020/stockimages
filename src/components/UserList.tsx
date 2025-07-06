'use client';

import { useState, useEffect } from 'react';
import { UserService, User } from '@/lib/firestore';

// Admin credentials - only these users can access the admin panel
const ADMIN_CREDENTIALS = [
  { email: 'vrinvites2020@gmail.com', password: 'manaswini@3951' },
  { email: 'vignesh.t3004@gmail.com', password: 'vignesh@1234' },
  // Add more admin credentials here
];

// Pagination settings
const ITEMS_PER_PAGE = 50;

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Always start with authentication screen
  useEffect(() => {
    setIsAuthenticated(false);
    setAdminEmail('');
  }, []);

  const handleAdminLogin = () => {
    const isValidCredentials = ADMIN_CREDENTIALS.some(
      cred => cred.email === adminEmail && cred.password === adminPassword
    );
    
    if (isValidCredentials) {
      setIsAuthenticated(true);
      loadUsers();
    } else {
      setError('Access denied. Invalid email or password.');
    }
  };

  // Calculate pagination
  const getPaginatedUsers = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return users.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await UserService.getAllUsers();
      setUsers(fetchedUsers);
      setTotalPages(Math.ceil(fetchedUsers.length / ITEMS_PER_PAGE));
      setCurrentPage(1);
      setError('');
    } catch (err) {
      setError(`Error loading users: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await UserService.deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError(`Error deleting user: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#18122B] via-[#1E1B3A] to-[#232946] text-white p-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          
          <div className="bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] rounded-2xl shadow-2xl border border-purple-900/40 p-6">
            <h2 className="text-2xl font-bold mb-6 text-purple-300">Admin Login</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-900/20 text-red-300 border border-red-700/40 rounded-md">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter admin email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full bg-[#18122B]/80 border border-purple-700/40 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              
              <input
                type="password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-[#18122B]/80 border border-purple-700/40 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              
              <button
                onClick={handleAdminLogin}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Access Admin Panel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#18122B] via-[#1E1B3A] to-[#232946] text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18122B] via-[#1E1B3A] to-[#232946] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Users Management
          </h1>
          <button
            onClick={loadUsers}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/20 text-red-300 border border-red-700/40 rounded-md">
            {error}
          </div>
        )}

        <div className="bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] rounded-2xl shadow-2xl border border-purple-900/40 p-6">
          <h2 className="text-2xl font-bold mb-6 text-purple-300">
            All Users ({users.length}) - Page {currentPage} of {totalPages}
          </h2>
          
          {users.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No users found. Add your first user above!</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-purple-700/40">
                      <th className="py-3 px-4 text-purple-300 font-semibold">Name</th>
                      <th className="py-3 px-4 text-purple-300 font-semibold">Studio</th>
                      <th className="py-3 px-4 text-purple-300 font-semibold">Email</th>
                      <th className="py-3 px-4 text-purple-300 font-semibold">Mobile</th>
                      <th className="py-3 px-4 text-purple-300 font-semibold">Place</th>
                      <th className="py-3 px-4 text-purple-300 font-semibold">Created</th>
                      <th className="py-3 px-4 text-purple-300 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedUsers().map((user) => (
                      <tr key={user.id} className="border-b border-purple-700/20 hover:bg-purple-900/20">
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.studio_name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">{user.mobile}</td>
                        <td className="py-3 px-4">{user.place}</td>
                        <td className="py-3 px-4 text-sm text-gray-400">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleDeleteUser(user.id!)}
                            className="text-red-400 hover:text-red-300 focus:outline-none"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <span className="px-4 py-2 text-purple-300">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
} 