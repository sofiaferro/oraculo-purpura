import { useState, useEffect} from "react";
import ReactCardFlip from "react-card-flip";
const back = "/img/back.jpg";

function Card() {
  const [tarotPeck, setTarotPeck] = useState([]);
  const [card, setCard] = useState({});
  const [meaning, setMeaning] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

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
    }, 500);
  }

  function handleGetCard() {
    getCard();
  }

  function handleBackToDeck() {
    setIsFlipped(() => !isFlipped);
  }

  return (
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
          src={`/img/cards/${card.img}`}
          className={meaning === "rev" ? "reversed card-img" : "card-img"}
          onClick={() => handleBackToDeck()}
        />
      </ReactCardFlip>
      <h4 className="name">{isFlipped ? card.name : ""}</h4>
      <p className="message">
        {isFlipped
          ? meaning === "rev"
            ? card.meaning_rev
            : card.meaning_up
          : ""}
      </p>
    </div>
  );
}

export default Card;
