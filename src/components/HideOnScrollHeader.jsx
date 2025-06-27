import React, { useEffect, useRef, useState } from 'react';

function HideOnScrollHeader({ children }) {
  const [show, setShow] = useState(true);
  const lastScroll = useRef(window.scrollY);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          if (currentScroll < 10) {
            setShow(true);
          } else if (currentScroll > lastScroll.current) {
            setShow(false); // scrolling down
          } else if (currentScroll < lastScroll.current) {
            setShow(true); // scrolling up
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
    <div style={{
      transition: 'transform 0.35s cubic-bezier(.4,0,.2,1)',
      transform: show ? 'translateY(0)' : 'translateY(-110%)',
      zIndex: 1100,
      position: 'sticky',
      top: 0
    }}>
      {children}
    </div>
  );
}

export default HideOnScrollHeader;
