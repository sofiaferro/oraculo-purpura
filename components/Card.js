import { useState, useEffect, useMemo, useRef } from "react";
import { gsap, TweenMax} from 'gsap';
import ReactCardFlip from "react-card-flip";
import Cafecito from "./Cafecito";
const back = "/img/back.jpg";

function Card() {
  const [tarotPeck, setTarotPeck] = useState([]);
  const [card, setCard] = useState({});
  const [meaning, setMeaning] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const name = useRef(null)
  const message = useRef(null)
  const cafecito = useRef(null)

  useEffect(() => {
    fetch("https://tarot-purpura-api.vercel.app/cards.json")
      .then((res) => res.json())
      .then((cardPeck) => {
        return setTarotPeck(cardPeck.cards);
      });
  }, []);

  function getCard() {
    const id = Math.floor(Math.random() * 78);
    const orientation = Math.floor(Math.random() * 2);
    orientation === 0 ? setMeaning("up") : setMeaning("rev");
    setCard(tarotPeck[id]);
    setTimeout(() => {
      setIsFlipped(() => !isFlipped);
    }, 600);
  }

  function handleGetCard() {
    getCard();
  }

  function handleBackToDeck() {
    setIsFlipped(() => !isFlipped);
  }

useMemo(() => {
    TweenMax.fromTo(name.current, 2, {
opacity: 0,
    }, {opacity: 1})
    TweenMax.fromTo(message.current, 2, {
opacity: 0,
    }, {opacity: 1})
}, [isFlipped])

  return (
    <>
      <div className="card-container">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <img
            alt=""
            src={back}
            className="card-img"
            onClick={() => handleGetCard()}
          />
          <img
            alt=""
            src={card.img && `/img/cards/${card.img}`}
            className={meaning === "rev" ? "reversed card-img" : "card-img"}
            onClick={() => handleBackToDeck()}
          />
        </ReactCardFlip>
        <h4 ref={name} className="name">{isFlipped && card.name}</h4>
        <p ref={message} className="message">
          {isFlipped
            ? meaning === "rev"
              ? card.meaning_rev
              : card.meaning_up
            : ""}
        </p>
      </div>
      {isFlipped && (
        <footer ref={cafecito} className="footer">
          <Cafecito />
        </footer>
      )}
    </>
  );
}

export default Card;
