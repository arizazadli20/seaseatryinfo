import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { teamMembers } from '../../content/team';

export function Team() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Continuous Marquee (Left to Right) for Team
    const track = trackRef.current;
    if (track) {
      // Calculate total width of one set of cards
      const scrollWidth = track.scrollWidth / 2;
      
      const tween = gsap.to(track, {
        x: -scrollWidth,
        duration: 25,
        ease: 'none',
        repeat: -1,
      });

      // Pause on hover for easier interaction
      const onEnter = () => tween.pause();
      const onLeave = () => tween.play();
      track.addEventListener('mouseenter', onEnter);
      track.addEventListener('mouseleave', onLeave);

      // Grayscale to Color intersection observer (keep the cool effect)
      const cards = containerRef.current?.querySelectorAll('.team-card');
      if (cards) {
         const observer = new IntersectionObserver((entries) => {
           entries.forEach(entry => {
             const img = entry.target.querySelector('img');
             if (!img) return;
             
             if (entry.isIntersecting) {
               gsap.to(img, { filter: 'grayscale(0%)', duration: 0.6, ease: 'power2.out' });
             } else {
               gsap.to(img, { filter: 'grayscale(100%)', duration: 0.6, ease: 'power2.out' });
             }
           });
         }, { threshold: 0.6, rootMargin: '0px -10% 0px -10%' });
         
         cards.forEach(c => observer.observe(c));
         return () => {
           observer.disconnect();
           track.removeEventListener('mouseenter', onEnter);
           track.removeEventListener('mouseleave', onLeave);
         };
      }
    }
  }, { scope: containerRef });

  // Double the team members for seamless looping
  const doubledMembers = [...teamMembers, ...teamMembers];

  return (
    <section ref={containerRef} id="team" className="py-24 bg-white relative z-20 overflow-hidden">
      <div className="container mx-auto px-0 lg:px-6 max-w-7xl">
        <div className="text-center mb-16 px-[20px]">
          <div className="w-6 h-6 mx-auto mb-6 text-brand-primary">
             <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"/></svg>
          </div>
        </div>
        
        {/* Continuous Marquee Track */}
        <div className="relative w-full overflow-hidden">
           {/* Fade masks on edges for modern feel */}
           <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
           <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
           
           <div 
             ref={trackRef} 
             className="flex w-max gap-8 md:gap-16 px-[20px] md:px-0"
           >
             {doubledMembers.map((member, idx) => (
               <a 
                 key={`${member.id}-${idx}`} 
                 href={member.linkedinUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 aria-label={`${member.name} LinkedIn Profile`}
                 className="team-card group w-[240px] md:w-[280px] shrink-0 flex flex-col items-center text-center cursor-pointer transition-transform hover:-translate-y-1 duration-300"
               >
                 <div className="relative w-28 h-28 md:w-32 md:h-32 bg-gray-100 rounded-full mb-6 flex items-center justify-center text-gray-400 overflow-hidden shrink-0 border border-gray-200 group-hover:border-brand-primary group-hover:ring-4 group-hover:ring-brand-primary/15 transition-all duration-300">
                   {member.photoUrl === '/placeholder-avatar.svg' ? (
                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                   ) : (
                     <img 
                       src={member.photoUrl} 
                       alt={member.name} 
                       className="w-full h-full object-cover object-top"
                       loading="lazy"
                     />
                   )}
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-1 tracking-tight group-hover:text-brand-primary transition-colors flex items-center justify-center gap-1.5">
                   <span>{member.name}</span>
                   <svg className="w-4 h-4 text-[#0A66C2] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all shrink-0" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0-.02-3.3 1.65 1.65 0 0 0 .02 3.3m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                   </svg>
                 </h3>
                 <p className="text-[13px] font-mono text-brand-primary mb-3 uppercase tracking-wider">{member.role}</p>
                 <p className="text-base text-gray-500 font-light">{member.responsibility}</p>
               </a>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}
