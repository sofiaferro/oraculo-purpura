import React, { useEffect, useRef, useState } from 'react';
import Cafecito from './Cafecito';
import { gsap } from 'gsap';

const Message = ({ isFlipped, data, meaning }) => {
  // REFS
  const container = useRef(null);
  // STATE to manage content visibility
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isFlipped && container.current && data?.name) {
      // Wait a bit for the card flip to complete, then show content
      const timer = setTimeout(() => {
        setShowContent(true);
        gsap.fromTo(
          container.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" }
        );
      }, 300); // Small delay to let card flip complete
      
      return () => clearTimeout(timer);
    } else if (!isFlipped && container.current) {
      // Immediately hide content and reset
      setShowContent(false);
      gsap.set(container.current, { opacity: 0 });
    }
  }, [isFlipped, data?.name]);

  // Don't render content until card is flipped and we have data
  if (!showContent || !data?.name) {
    return <div ref={container} className='content' style={{ opacity: 0 }} />;
  }

  return (
    <div ref={container} className='content' style={{ opacity: 0 }}>
      <h5 className='name'>{data.name}</h5>
      <p className='message'>
        {meaning === 'rev' ? data.meaning_rev : data.meaning_up}
      </p>
      <footer className='footer'><Cafecito /></footer>
    </div>
  );
};

export default Message;
