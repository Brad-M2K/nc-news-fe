import React, { useEffect, useState } from 'react';
import ArrowUpIcon from '../assets/Circle Fading Arrow Up.svg';
import './BackToTopButton.css';

function BackToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            className={`back-to-top-btn${visible ? ' show' : ''}`}
            onClick={scrollToTop}
            aria-label="Back to top"
        >
            <img
                src={ArrowUpIcon}
                alt="Back to top arrow"
                className="back-to-top-arrow-img"
                width={36}
                height={36}
                draggable="false"
            />
        </button>
    );
}

export default BackToTopButton;
