const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="/avatar.jpeg"
              alt="Otabek Mahkamov"
              className="rounded-lg shadow-xl w-full max-w-md mx-auto"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Welcome to My Portfolio
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              I am Otabek Mahkamov, a passionate professional dedicated to excellence in my field.
              With years of experience and numerous achievements, I strive to make a meaningful impact
              through my work.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Explore my portfolio to see my latest projects, check out my achievements,
              and feel free to reach out if you'd like to collaborate or learn more about my work.
            </p>
            <div className="flex space-x-4">
              <a
                href="/portfolio"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                View Portfolio
              </a>
              <a
                href="/contact"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 