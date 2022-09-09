import { useState } from 'react';

import ReactCardFlip from 'react-card-flip';
import Message from './Message';

import data from '../data/cards.json';

function Card() {
  // STATES
  const [card, setCard] = useState({});
  const [meaning, setMeaning] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  
  // HANDLERS
  const getCard = () => {
    const id = Math.floor(Math.random() * 78);
    const orientation = Math.floor(Math.random() * 2);
    orientation === 0 ? setMeaning('up') : setMeaning('rev');
    setCard(data.cards[id]);
    setIsFlipped(() => true);
  };

  const handleGetCard = () => {
    getCard();
  };
  const handleBackToDeck = () => {
    setIsFlipped(() => false);
  };

  // TEMPLATE
  const imgSrc = `/img/cards/${card?.img}`;
  const imgClass = meaning === 'rev' ? 'reversed card-img' : 'card-img';

  return (
    <div className='card-container'>
      <img alt="" src="/img/oracle_alfa.png" className="background" />
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
        <img
          alt=''
          src={imgSrc}
          className={imgClass}
          onClick={handleBackToDeck}
        />
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
