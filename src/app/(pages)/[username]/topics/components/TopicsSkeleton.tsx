const TopicsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(9)].map(() => (
        <div
          key={crypto.randomUUID()}
          className="bg-white/30 animate-pulse rounded-2xl p-10 flex flex-col items-center justify-center space-y-4 shadow-md min-h-[150px]"
        >
          {/* círculo ícono */}
          <div className="w-14 h-14 bg-white/50 rounded-full" />

          {/* título */}
          <div className="h-4 bg-white/60 rounded w-3/4" />

          {/* cantidad de preguntas */}
          <div className="h-3 bg-white/40 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
};

export default TopicsSkeleton;
