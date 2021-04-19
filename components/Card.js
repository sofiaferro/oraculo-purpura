import { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
const back = "/img/back.jpg";

function Card() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
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
        const orientation = Math.floor(Math.random() * 2);
        try {
          const img = `/img/cards/${card.img}`;
          setImage(img);
          orientation === 0 ? setImageOr("up") : setImageOr("down");
          orientation === 0
            ? setMessage(card.meaning_up)
            : setMessage(card.meaning_rev);
          setName(card.name);
        } catch (e) {
          console.log(e);
        } finally {
          setIsFlipped(!isFlipped);
        }
      }
      getCards();
    }
  }, [loading]);

  function handleGetCard() {
    if (loading !== 0) {
      setImage(back);
    }
    setLoading((loading) => loading + 1);
  }

  function handleBackToDeck() {
    setIsFlipped(!isFlipped);
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
