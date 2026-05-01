import { motion, useScroll, useTransform } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type NavbarPosition = 'fixed' | 'sticky';
type NavbarVariant = 'default' | 'project';

const NAV_ITEMS = [
  { label: 'About me', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

export function Navbar({
  position = 'fixed',
  variant = 'default',
}: {
  position?: NavbarPosition;
  variant?: NavbarVariant;
}) {
  const { scrollY } = useScroll();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isProject = location.pathname === '/projects' || location.pathname.includes('projects');
  const [activeSection, setActiveSection] = useState('');
  
  // Navbar content appears when scroll > 100px.
  const contentOpacity = useTransform(scrollY, [100, 300], [0, 1], { clamp: true });
  
  // Navbar background appears when scrolling past hero
  const bgOpacity = useTransform(scrollY, [200, 400], [0, 1], { clamp: true });
  
  // Logo appears when scrolled into navbar
  const logoOpacity = useTransform(scrollY, [200, 300], [0, 1], { clamp: true });

  // Track active section based on scroll position
  useEffect(() => {
    // On non-home routes, statically highlight "Projects" and skip scroll tracking
    if (location.pathname !== '/') {
      setActiveSection('projects');
      return;
    }

    const handleScroll = () => {
      const sections = ['about', 'projects', 'skills', 'contact'];
      let closestSection = '';
      let closestDistance = Infinity;
      
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Find the section whose top is closest to the trigger point (200px)
          const distance = Math.abs(rect.top - 200);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = section;
          }
        }
      });
      
      if (closestSection) {
        setActiveSection(closestSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navItems = NAV_ITEMS;

  const getNavLinkClass = (id: string) => {
    const isActive = activeSection === id;
    return `hidden md:block text-sm font-medium transition-all duration-300 ${
      isActive
        ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]'
        : 'text-white/70 hover:text-white'
    }`;
  };

  const handleResumeClick = useCallback(() => {
    window.open('/ApurvaK-Resume.pdf', '_blank');
  }, []);

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const positionClass = position === 'sticky' ? 'sticky top-0' : 'fixed top-6';
  const useProjectLayout = isProject || variant === 'project';
  const navClass = isProject
    ? 'fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] z-50 pointer-events-none border border-white/10 rounded-2xl'
    : `${positionClass} left-0 right-0 z-50 pointer-events-none px-4 md:px-24`;

  const shellClass = useProjectLayout
    ? 'flex items-center justify-between px-6 h-[64px] pointer-events-auto'
    : 'relative w-full h-[64px] bg-[#111625]/90 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-between px-5 md:px-8 pointer-events-auto';

  return (
    <motion.nav className={navClass}>
      <motion.div 
        style={{ opacity: isHome ? bgOpacity : 1 }}
        className={shellClass}
      >
        {/* Logo */}
        <motion.button
          style={{ opacity: isHome ? logoOpacity : 1 }}
          onClick={handleLogoClick}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain" />
        </motion.button>

        {/* Menu and Resume */}
        <motion.div style={{ opacity: isHome ? contentOpacity : 1 }} className="flex items-center gap-6 md:gap-8 h-full">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={`/#${item.id}`} 
              className={getNavLinkClass(item.id)}
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-6 md:border-l border-white/20 md:pl-6 pl-2">
            <button 
              onClick={handleResumeClick}
              className="px-5 py-2 rounded-full bg-black/50 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'linear-gradient(135deg, #60a5fa, #a855f7, #ec4899)' }} />
              Resume
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}