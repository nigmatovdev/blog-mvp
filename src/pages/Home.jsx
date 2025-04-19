import { Link } from 'react-router-dom';
import Container from '../components/Container';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Welcome to Otabek Mahkamov's portfolio. Explore my work in web development, design, and more. View my latest projects and achievements."
        pathname="/"
      />
      <Container className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="md:w-1/2">
              <img
                src="/avatar.jpeg"
                alt="Otabek Mahkamov"
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl font-bold text-black">
                Welcome to My Portfolio
              </h1>
              <p className="text-lg text-black/60">
                I am Otabek Mahkamov, a passionate professional dedicated to excellence in my field.
                With years of experience and numerous achievements, I strive to make a meaningful impact
                through my work.
              </p>
              <p className="text-lg text-black/60">
                Explore my portfolio to see my latest projects, check out my achievements,
                and feel free to reach out if you'd like to collaborate or learn more about my work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/portfolio"
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-black/90 transition duration-300 text-center"
                >
                  View Portfolio
                </Link>
                <Link
                  to="/contact"
                  className="bg-white text-black border border-black/10 px-6 py-3 rounded-lg hover:bg-black/5 transition duration-300 text-center"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home; 