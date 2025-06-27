import React, { useEffect, useRef, useState } from 'react';

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
      style={{
        position: 'sticky',
        top: headerVisible ? 50 : 20, // 50px when header is visible, 20px when hidden
        transition: 'top 0.35s cubic-bezier(.4,0,.2,1)',
        zIndex: 1099,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'auto',
      }}
    >
      {children}
    </div>
  );
}

export default FloatingNavOnHeaderHide;
