export default function HeroVisual() {
  return (
    <div
      className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden min-h-[600px] xl:min-h-[700px]"
      aria-hidden="true"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
        
        {/* Rotating rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-violet-500/20 rounded-full animate-[spin_30s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-fuchsia-500/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-500/10 rounded-full animate-[spin_50s_linear_infinite]" />
      </div>

      {/* Main Visual Element */}
      <div className="relative z-10">
        {/* Outer Glow */}
        <div className="absolute -inset-12 bg-gradient-to-r from-violet-500/30 via-fuchsia-500/30 to-amber-500/30 rounded-full blur-3xl animate-pulse" />

        {/* Main Lightning Card */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-500 flex items-center justify-center shadow-2xl shadow-violet-500/40 animate-float">
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-white/10 to-white/20" />
          
          {/* Lightning SVG */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-28 h-28 sm:w-32 sm:h-32 text-white drop-shadow-2xl"
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <path 
              d="M13 10V3L4 14h7v7l9-11h-7z" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill="currentColor"
              fillOpacity="0.2"
            />
          </svg>

          {/* Spark effects */}
          <div className="absolute -top-3 -right-3 w-4 h-4 bg-white rounded-full animate-ping" />
          <div className="absolute -bottom-2 -left-4 w-3 h-3 bg-amber-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/2 -right-6 w-2.5 h-2.5 bg-fuchsia-300 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        </div>

        {/* Floating Service Icons */}
        <div
          className="absolute -top-8 -left-16 w-16 h-16 rounded-2xl bg-[var(--bg-elevated)] border border-violet-500/30 flex items-center justify-center shadow-xl animate-float backdrop-blur-sm"
          style={{ animationDelay: '0.3s' }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-violet-400" stroke="currentColor" strokeWidth="1.5">
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div
          className="absolute -bottom-6 -right-12 w-14 h-14 rounded-xl bg-[var(--bg-elevated)] border border-amber-500/30 flex items-center justify-center shadow-xl animate-float backdrop-blur-sm"
          style={{ animationDelay: '0.8s' }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-amber-400" stroke="currentColor" strokeWidth="1.5">
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div
          className="absolute top-1/3 -right-20 w-12 h-12 rounded-lg bg-[var(--bg-elevated)] border border-fuchsia-500/30 flex items-center justify-center shadow-xl animate-float backdrop-blur-sm"
          style={{ animationDelay: '1.3s' }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-fuchsia-400" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 9h18M9 21V9"/>
          </svg>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
    </div>
  );
}
