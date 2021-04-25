import { useState, useEffect, useMemo } from "react";
import ReactCardFlip from "react-card-flip";
const back = "/img/back.jpg";

function Card() {
  const [tarotPeck, setTarotPeck] = useState([]);
  const cardInitState = {
    name: "",
    message: "",
    image: "",
    imageOr: ""
  } 
  const [card, setCard] = useState(cardInitState);
  const [isFlipped, setIsFlipped] = useState(false);
  /*   const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [imageOr, setImageOr] = useState("");
  const [loading, setLoading] = useState(0);*/

  useEffect(() => {
    fetch("https://tarot-purpura-api.vercel.app/cards.json")
      .then((res) => res.json())
      .then((cardPeck) => {
        return setTarotPeck(cardPeck.cards);
      });
  }, []);

  /*useEffect(() => {
    if (loading !== 0) {
      async function getCards() {
        const id = Math.floor(Math.random() * 78) + 1;
        fetch(`https://tarot-purpura-api.vercel.app/cards/${id}.json`)
          .then((res) => res.json())
          .then((cardPeck) => {
            return getCardInfo(cardPeck.cards[0]);
          })
          .then(() => {
            return setIsFlipped(!isFlipped);
          });
      }

      function getCardInfo(card) {
        const orientation = Math.floor(Math.random() * 2);
        const img = `/img/cards/${card.img}`;
        setImage(img);
        orientation === 0 ? setImageOr("up") : setImageOr("down");
        orientation === 0
          ? setMessage(card.meaning_up)
          : setMessage(card.meaning_rev);
        setName(card.name)
      }

      getCards();
    }
  }, [loading]);

  function handleGetCard() {
    getCards();
  }

  function handleBackToDeck() {
    setIsFlipped(!isFlipped);
    setImage(() => image === "");
    setMessage(() => message === "");
    setName(() => name === "");
    setImageOr(() => imageOr === "")
  } */
  function getCard() {
    const id = Math.floor(Math.random() * 78);
    setCard(tarotPeck[id]);
    setIsFlipped(() => !isFlipped)
  }
  function handleGetCard() {
    getCard();
    console.log(card)
  }

  function handleBackToDeck() {
    setCard(cardInitState)
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
          src={card.img ? `/img/cards/${card.img}` : ""}
          className={card.imageOr === "down" ? "reversed card-img" : "card-img"}
          onClick={() => handleBackToDeck()}
        />
      </ReactCardFlip>
      <h4 className="name">{card.name}</h4>
      <p className="message">{card.imageOr === "down" ? card.meaning_rev : card.meaning_up}</p>
    </div>
  );
}

export default Card;
