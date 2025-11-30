const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 transition-opacity duration-300 animate-in fade-in">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
