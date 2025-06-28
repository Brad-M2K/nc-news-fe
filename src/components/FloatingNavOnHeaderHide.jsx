import React, { useEffect, useRef, useState } from 'react';
import './FloatingNavOnHeaderHide.css';

function FloatingNavOnHeaderHide({ children }) {
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScroll = useRef(window.scrollY);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          if (currentScroll < 10) {
            setHeaderVisible(true);
          } else if (currentScroll > lastScroll.current) {
            setHeaderVisible(false); // scrolling down
          } else if (currentScroll < lastScroll.current) {
            setHeaderVisible(true); // scrolling up
          }
          lastScroll.current = currentScroll;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`floating-nav-wrapper${headerVisible ? '' : ' header-hidden'}`}
    >
      {children}
    </div>
  );
}

export default FloatingNavOnHeaderHide;
