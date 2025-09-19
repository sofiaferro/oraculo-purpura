import { useState, useEffect, useCallback } from 'react';

import ReactCardFlip from 'react-card-flip';
import Message from './Message';

import data from '../data/cards.json';

function Card() {
  // STATES
  const [card, setCard] = useState({});
  const [meaning, setMeaning] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [nextCard, setNextCard] = useState({});
  const [nextMeaning, setNextMeaning] = useState('');
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  
  // PRELOAD ALL CARD IMAGES
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = data.cards.map(card => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = `/img/cards/${card.img}`;
        });
      });
      
      try {
        await Promise.all(imagePromises);
        setImagesPreloaded(true);
        // Prepare the first card
        prepareNextCard();
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesPreloaded(true); // Continue even if some images fail
        prepareNextCard();
      }
    };
    
    preloadImages();
  }, []);
  
  // PREPARE NEXT CARD
  const prepareNextCard = useCallback(() => {
    const id = Math.floor(Math.random() * data.cards.length);
    const orientation = Math.floor(Math.random() * 2);
    const newMeaning = orientation === 0 ? 'up' : 'rev';
    
    setNextCard(data.cards[id]);
    setNextMeaning(newMeaning);
  }, []);

  // HANDLERS
  const handleGetCard = () => {
    if (!imagesPreloaded || !nextCard.img) {
      // Fallback if preloading isn't ready
      const id = Math.floor(Math.random() * data.cards.length);
      const orientation = Math.floor(Math.random() * 2);
      const newMeaning = orientation === 0 ? 'up' : 'rev';
      setCard(data.cards[id]);
      setMeaning(newMeaning);
    } else {
      // Use preloaded card
      setCard(nextCard);
      setMeaning(nextMeaning);
      // Prepare the next card for next time
      prepareNextCard();
    }
    
    // Flip immediately
    setIsFlipped(true);
  };
  
  const handleBackToDeck = () => {
    setIsFlipped(false);
    // Clear card data after a small delay to prevent flickering
    setTimeout(() => {
      setCard({});
      setMeaning('');
    }, 200);
  };

  // TEMPLATE
  const imgSrc = card?.img ? `/img/cards/${card.img}` : '';
  const imgClass = 'card-img';

  return (
    <div className='card-container'>
      <img alt="" src="/img/oracle_alfa_2.png" className="background" />
      <ReactCardFlip 
        isFlipped={isFlipped} 
        flipDirection='horizontal'
      >
        <img
          alt=''
          src={'/img/back.jpg'}
          className='card-img'
          onClick={handleGetCard}
        />
        {imgSrc ? (
          <img
            alt={card?.name || ''}
            src={imgSrc}
            className={imgClass}
            onClick={handleBackToDeck}
            style={{
              transform: meaning === 'rev' ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.3s ease'
            }}
          />
        ) : (
          <div 
            className='card-img' 
            style={{ 
              backgroundColor: '#ab90b9', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'white',
              height: '260px' // Match typical card aspect ratio
            }}
            onClick={handleBackToDeck}
          >
            Loading...
          </div>
        )}
      </ReactCardFlip>
      <Message 
        isFlipped={isFlipped} 
        data={card} 
        meaning={meaning}
       />
    </div>
  );
}

export default Card;
