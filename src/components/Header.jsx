import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Otabek Mahkamov
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link to="/portfolio" className="text-gray-600 hover:text-gray-900">Portfolio</Link>
            <Link to="/achievements" className="text-gray-600 hover:text-gray-900">Achievements</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-lg"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/portfolio" 
                className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link 
                to="/achievements" 
                className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Achievements
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 