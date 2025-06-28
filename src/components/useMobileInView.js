import { useEffect, useRef, useState } from 'react';

/**
 * useMobileInView
 * @param {Array} items - The array of items to track (must be stable, e.g. comments array)
 * @param {function} getId - Function to get a unique id from each item (e.g. item => item.comment_id)
 * @param {number} maxWidth - Max width for mobile (default 700)
 * @returns {[activeId, cardRefs]}
 */
export default function useMobileInView(items, getId, maxWidth = 700) {
  const [activeId, setActiveId] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!items.length) return;
    cardRefs.current = cardRefs.current.slice(0, items.length);
    const isMobile = window.matchMedia(`(max-width: ${maxWidth}px)`).matches;
    if (!isMobile) {
      setActiveId(null);
      return;
    }
    const handleScroll = () => {
      let minDist = Infinity;
      let minIdx = null;
      cardRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const dist = Math.abs(cardCenter - viewportCenter);
          if (dist < minDist) {
            minDist = dist;
            minIdx = idx;
          }
        }
      });
      setActiveId(minIdx !== null ? getId(items[minIdx]) : null);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, getId, maxWidth]);

  return [activeId, cardRefs];
}
