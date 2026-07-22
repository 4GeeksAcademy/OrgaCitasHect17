import React, { useState, useEffect, useRef } from 'react';

export const HeroScroll = () => {
  const slides = [
    { id: 1, text: "Gestiona tus citas médicas sin complicaciones.", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500" },
    { id: 2, text: "Médicos especialistas a un solo clic de distancia.", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500" },
    { id: 3, text: "Tu historial de salud siempre organizado.", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % slides.length;

        if (scrollContainerRef.current) {
          const containerWidth = scrollContainerRef.current.clientWidth;


          scrollContainerRef.current.scrollTo({
            left: nextIndex * containerWidth,
            behavior: 'smooth'
          });
        }

        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div ref={scrollContainerRef} style={styles.scrollContainer}>
      {slides.map(slide => (
        <div
          key={slide.id}
          style={{
            ...styles.slide,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.img})`
          }}
        >
          <h2 style={styles.text}>{slide.text}</h2>
        </div>
      ))}
    </div>
  );
};

const styles = {
  scrollContainer: {
    display: 'flex',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    scrollBehavior: 'smooth',
    width: '100%',
    height: '350px',
    margin: '1rem 0',
    gap: '0px',
    scrollbarWidth: 'none'
  },
  slide: {
    flex: '0 0 100%',
    scrollSnapAlign: 'start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    padding: '20px',
    boxSizing: 'border-box'
  },
  text: {
    color: '#fff',
    fontSize: '1.8rem',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0,0,0,0.6)'
  }
};