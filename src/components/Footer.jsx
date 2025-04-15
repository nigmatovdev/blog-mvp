import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-black/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-black/60 text-sm">
            © {new Date().getFullYear()} Otabek Mahkamov. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/60 hover:text-black transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/60 hover:text-black transition-colors duration-300"
            >
              YouTube
            </a>
            <a
              href="mailto:contact@otabekmahkamov.com"
              className="text-black/60 hover:text-black transition-colors duration-300"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 