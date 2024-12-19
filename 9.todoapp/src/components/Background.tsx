

export const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-gray-700/[0.1] dark:bg-grid-white/[0.05] bg-[length:30px_30px]" />
      
      {/* Radial gradients */}
      <div className="absolute inset-0">
        <div className="absolute -left-[10%] -top-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-3xl dark:from-purple-500/20 dark:to-blue-500/20" />
        <div className="absolute -right-[10%] top-[20%] w-[40%] h-[40%] rounded-full bg-gradient-to-l from-blue-500/30 to-purple-500/30 blur-3xl dark:from-blue-500/20 dark:to-purple-500/20" />
        <div className="absolute left-[20%] -bottom-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-t from-purple-500/30 to-blue-500/30 blur-3xl dark:from-purple-500/20 dark:to-blue-500/20" />
      </div>
      
      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white dark:from-gray-950/80 dark:to-gray-950" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent dark:from-gray-950/50" />
    </div>
  );
};