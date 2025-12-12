interface SectionHeadlineProps {
  parts: readonly string[];
  gradientIndex: number;
  animate?: boolean;
  className?: string;
}

export default function SectionHeadline({ 
  parts, 
  gradientIndex, 
  animate = true,
  className = '' 
}: SectionHeadlineProps) {
  return (
    <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.15] sm:leading-[1.1] mb-0 tracking-tight m-0 p-0 ${className}`}>
      {parts.map((part, index) => {
        const isGradient = index === gradientIndex;
        
        if (isGradient) {
        return (
          <span 
            key={index}
            className={`block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 py-1 sm:py-2 ${index === 1 ? '-ml-2 sm:-ml-4' : ''} ${animate ? 'animate-fadeIn delay-200' : ''}`}
          >
            {part}
          </span>
        );
        }
        
        return (
          <span 
            key={index}
            className={`block text-gray-900 transform hover:scale-105 transition-transform py-1 sm:py-2 ${index === 2 ? '-ml-1 sm:-ml-2' : ''} ${animate ? 'animate-fadeIn delay-200' : ''}`}
          >
            {part}
          </span>
        );
      })}
    </h1>
  );
}

