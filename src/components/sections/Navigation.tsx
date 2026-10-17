import { useState, useEffect } from 'react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0B1121]/85 backdrop-blur-md border-b border-white/10 shadow-lg' 
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="w-full px-[20px] md:px-6 h-[56px] md:h-20 flex items-center justify-center max-w-7xl mx-auto">
          
          <a href="#hero" className="flex items-center" aria-label="SeaSentry Home">
            {/* Full Logo */}
            <div className="h-11 md:h-14 transition-all duration-300">
              <img 
                src="/logo.png" 
                alt="SeaSentry Logo" 
                className="h-full w-auto object-contain transition-all duration-300" 
                style={{ filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4))' }} 
              />
            </div>
          </a>

        </div>
      </nav>
    </>
  );
}
