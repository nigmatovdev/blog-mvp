const Container = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-white`}>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-12 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default Container; 