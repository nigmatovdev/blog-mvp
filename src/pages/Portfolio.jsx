import { useState, useEffect, useCallback, useMemo } from 'react';
import Container from '../components/Container';

const Portfolio = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterType, setFilterType] = useState('all');
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debounce search term with shorter delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Reduced to 300ms for faster response

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchPortfolioItems = useCallback(async () => {
    try {
      setIsSearching(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/portfolio?type=${filterType}&search=${debouncedSearchTerm}&sortBy=${sortBy}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio items');
      }
      const data = await response.json();
      setPortfolioItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSearching(false);
      setInitialLoading(false);
    }
  }, [filterType, debouncedSearchTerm, sortBy]);

  useEffect(() => {
    fetchPortfolioItems();
  }, [fetchPortfolioItems]);

  // Client-side filtered items for instant feedback
  const filteredItems = useMemo(() => {
    if (!searchTerm) return portfolioItems;
    
    const searchLower = searchTerm.toLowerCase();
    return portfolioItems.filter(item => 
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower)
    );
  }, [portfolioItems, searchTerm]);

  if (initialLoading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-8">Portfolio</h1>
        
        {/* Filters and Search */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search portfolio..."
              className="w-full px-4 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
              </div>
            )}
          </div>
          <select
            className="px-4 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="design">Design</option>
          </select>
          <select
            className="px-4 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item._id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-black/10 transition-opacity duration-200"
            >
              {item.image && (
                <img
                  src={`${import.meta.env.VITE_API_URL}${item.image}`}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-black mb-2">{item.title}</h2>
                <p className="text-black/60 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-black/40">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-black/60"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Portfolio; 