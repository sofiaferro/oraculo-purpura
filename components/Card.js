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
  const [isLoading, setIsLoading] = useState(true);
  
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
        // Add small delay to ensure smooth transition
        setTimeout(() => setIsLoading(false), 300);
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesPreloaded(true); // Continue even if some images fail
        prepareNextCard();
        setTimeout(() => setIsLoading(false), 300);
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

  const onKey = (handler) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler();
    }
  };

  return (
    <div className='card-container' style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}>
      <div className='oracle'>
        <img alt="Oráculo Púrpura" src="/img/oracle_alfa_2.png" className="background" />
        <div className='deck'>
          <ReactCardFlip
            isFlipped={isFlipped}
            flipDirection='horizontal'
          >
            <img
              alt='Mazo: tocá para sacar una carta'
              src={'/img/back.jpg'}
              className='card-img'
              role='button'
              tabIndex={isFlipped ? -1 : 0}
              onClick={handleGetCard}
              onKeyDown={onKey(handleGetCard)}
            />
            {imgSrc ? (
              <img
                alt={card?.name || ''}
                src={imgSrc}
                className={imgClass}
                role='button'
                tabIndex={isFlipped ? 0 : -1}
                onClick={handleBackToDeck}
                onKeyDown={onKey(handleBackToDeck)}
                style={{
                  transform: meaning === 'rev' ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.3s ease'
                }}
              />
            ) : (
              <div
                className='card-img card-placeholder'
                onClick={handleBackToDeck}
              >
                Loading...
              </div>
            )}
          </ReactCardFlip>
        </div>
        <p className='hint' style={{ opacity: isFlipped ? 0 : 1 }} aria-hidden={isFlipped}>
          Pensá en tu pregunta y tocá la carta
        </p>
      </div>
      <Message
        isFlipped={isFlipped}
        data={card}
        meaning={meaning}
       />
    </div>
  );
}

export default Card;
