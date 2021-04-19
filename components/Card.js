import { useState, useEffect } from "react";
//import back from "/img/back.jpg";
import ReactCardFlip from "react-card-flip";

const back = "/img/back.jpg"

function Card() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(back);
  const [imageOr, setImageOr] = useState("");
  const [loading, setLoading] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (loading !== 0) {
      async function getCards() {
        const id = Math.floor(Math.random() * 78) + 1;
        fetch(`https://tarot-purpura-api.vercel.app/cards/${id}.json`)
          .then((res) => res.json())
          .then((cardPeck) => {
            return getCardInfo(cardPeck.cards[0]);
          });
      }

      function getCardInfo(card) {
        const img = `/img/cards/${card.img}`
        setImage(img);
        const orientation = Math.floor(Math.random() * 2);
        orientation === 0 ? setImageOr("up") : setImageOr("down");
        orientation === 0
          ? setMessage(card.meaning_up)
          : setMessage(card.meaning_rev);
        setName(card.name);
        setIsFlipped((isFlipped) => !isFlipped);
      }
      getCards();
    }
  }, [loading]);

  function handleGetCard() {
    setLoading(!loading);
  }

  function handleBackToDeck() {
    setIsFlipped(!isFlipped);
    setImage(back)
    setMessage(() => message === "");
    setName(() => name === "");
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
          src={image}
          className={imageOr === "down" ? "reversed card-img" : "card-img"}
          onClick={() => handleBackToDeck()}
        />
      </ReactCardFlip>
      <h4 className="name">{name}</h4>
      <p className="message">{message}</p>
    </div>
  );
}

export default Card;
