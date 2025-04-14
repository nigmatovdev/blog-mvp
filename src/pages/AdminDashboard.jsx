import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form states for portfolio
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    description: '',
    type: 'web',
    link: '',
    image: null,
    isFeatured: false
  });

  // Form states for achievement
  const [achievementForm, setAchievementForm] = useState({
    year: new Date().getFullYear(),
    items: ['']
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Axios config with token
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [portfolioRes, achievementsRes, messagesRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/portfolio`, axiosConfig),
        axios.get(`${import.meta.env.VITE_API_URL}/api/achievements`, axiosConfig),
        axios.get(`${import.meta.env.VITE_API_URL}/api/contact`, axiosConfig)
      ]);

      setPortfolioItems(portfolioRes.data);
      setAchievements(achievementsRes.data);
      setMessages(messagesRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
      setLoading(false);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  // Portfolio management
  const handlePortfolioSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(portfolioForm).forEach(key => {
        formData.append(key, portfolioForm[key]);
      });

      await axios.post(`${import.meta.env.VITE_API_URL}/api/portfolio`, formData, {
        ...axiosConfig,
        headers: {
          ...axiosConfig.headers,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      fetchData();
      setPortfolioForm({
        title: '',
        description: '',
        type: 'web',
        link: '',
        image: null,
        isFeatured: false
      });
    } catch (error) {
      console.error('Error adding portfolio item:', error);
      setError('Failed to add portfolio item');
    }
  };

  const handlePortfolioDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/portfolio/${id}`, axiosConfig);
        fetchData();
      } catch (error) {
        console.error('Error deleting portfolio item:', error);
        setError('Failed to delete portfolio item');
      }
    }
  };

  // Achievement management
  const handleAchievementItemChange = (index, value) => {
    const newItems = [...achievementForm.items];
    newItems[index] = value;
    setAchievementForm({ ...achievementForm, items: newItems });
  };

  const addAchievementItem = () => {
    setAchievementForm({
      ...achievementForm,
      items: [...achievementForm.items, '']
    });
  };

  const removeAchievementItem = (index) => {
    const newItems = achievementForm.items.filter((_, i) => i !== index);
    setAchievementForm({ ...achievementForm, items: newItems });
  };

  const handleAchievementSubmit = async (e) => {
    e.preventDefault();
    try {
      // Filter out empty items
      const filteredItems = achievementForm.items.filter(item => item.trim() !== '');
      if (filteredItems.length === 0) {
        setError('Please add at least one achievement item');
        return;
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/api/achievements`, {
        year: achievementForm.year,
        items: filteredItems
      }, axiosConfig);
      
      fetchData();
      setAchievementForm({
        year: new Date().getFullYear(),
        items: ['']
      });
    } catch (error) {
      console.error('Error adding achievement:', error);
      setError('Failed to add achievement');
    }
  };

  const handleAchievementDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/achievements/${id}`, axiosConfig);
        fetchData();
      } catch (error) {
        console.error('Error deleting achievement:', error);
        setError('Failed to delete achievement');
      }
    }
  };

  // Message management
  const handleMessageDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/contact/${id}`, axiosConfig);
        fetchData();
      } catch (error) {
        console.error('Error deleting message:', error);
        setError('Failed to delete message');
      }
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <button
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeTab === 'portfolio'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('portfolio')}
              >
                Portfolio
              </button>
              <button
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeTab === 'achievements'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('achievements')}
              >
                Achievements
              </button>
              <button
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeTab === 'messages'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('messages')}
              >
                Messages
              </button>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'portfolio' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Add Portfolio Item</h2>
            <form onSubmit={handlePortfolioSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={portfolioForm.title}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={portfolioForm.description}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={portfolioForm.type}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, type: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                  <option value="design">Design</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Link</label>
                <input
                  type="url"
                  value={portfolioForm.link}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, link: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, image: e.target.files[0] })}
                  className="mt-1 block w-full"
                  accept="image/*"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={portfolioForm.isFeatured}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, isFeatured: e.target.checked })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Featured</label>
              </div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Portfolio Item
              </button>
            </form>

            <div className="mt-8">
              <h2 className="text-lg font-medium mb-4">Portfolio Items</h2>
              <div className="grid grid-cols-1 gap-4">
                {portfolioItems.map((item) => (
                  <div key={item._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                        <p className="text-sm text-gray-500">Type: {item.type}</p>
                        {item.link && (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                            View Project
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => handlePortfolioDelete(item._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Add Achievement</h2>
            <form onSubmit={handleAchievementSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Year</label>
                <input
                  type="number"
                  value={achievementForm.year}
                  onChange={(e) => setAchievementForm({ ...achievementForm, year: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                  min="1900"
                  max="2100"
                />
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Achievement Items</label>
                {achievementForm.items.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <textarea
                      value={item}
                      onChange={(e) => handleAchievementItemChange(index, e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      rows="2"
                      placeholder="Enter achievement text (HTML tags are supported for links)"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeAchievementItem(index)}
                      className="px-2 py-1 text-red-600 hover:text-red-800"
                      disabled={achievementForm.items.length === 1}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAchievementItem}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  + Add Item
                </button>
              </div>

              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Achievements
              </button>
            </form>

            <div className="mt-8">
              <h2 className="text-lg font-medium mb-4">Existing Achievements</h2>
              <div className="space-y-8">
                {achievements
                  .sort((a, b) => b.year - a.year) // Sort by year descending
                  .map((achievement) => (
                    <div key={achievement._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold">{achievement.year}</h3>
                        <button
                          onClick={() => handleAchievementDelete(achievement._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete Year
                        </button>
                      </div>
                      <div className="space-y-2">
                        {achievement.items.map((item, index) => (
                          <div
                            key={index}
                            className="text-gray-700"
                            dangerouslySetInnerHTML={{ __html: item }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Contact Messages</h2>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{message.name}</h3>
                      <p className="text-gray-600">{message.email}</p>
                      <p className="text-gray-600">{message.message}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(message.date).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleMessageDelete(message._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard; 