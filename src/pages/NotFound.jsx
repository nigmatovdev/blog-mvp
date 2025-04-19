import { Link } from 'react-router-dom';
import Container from '../components/Container';

const NotFound = () => {
  return (
    <Container className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-black/10">404</h1>
        <h2 className="text-3xl font-bold text-black mt-4">Page Not Found</h2>
        <p className="text-black/60 mt-2 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-black rounded-lg hover:bg-black/90 transition duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </Container>
  );
};

export default NotFound; 