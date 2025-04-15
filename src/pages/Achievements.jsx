import { useState, useEffect } from 'react';
import Container from '../components/Container';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/achievements`);
        if (!response.ok) {
          throw new Error('Failed to fetch achievements');
        }
        const data = await response.json();
        setAchievements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
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

  // Group achievements by year
  const achievementsByYear = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.year]) {
      acc[achievement.year] = [];
    }
    acc[achievement.year].push(...achievement.items);
    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(achievementsByYear).sort((a, b) => b - a);

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-12">Achievements</h1>
        
        <div className="space-y-12">
          {sortedYears.map((year) => (
            <div key={year} className="space-y-6">
              <h2 className="text-2xl font-bold text-black">{year}</h2>
              <div className="prose prose-lg max-w-none">
                {achievementsByYear[year].map((item, index) => (
                  <div
                    key={index}
                    className="text-black/60 mb-4"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Achievements; 