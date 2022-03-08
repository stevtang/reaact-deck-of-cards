import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";
import axios from "axios";
const BASE_URL = "http://deckofcardsapi.com/api/";

/** Fetches DeckID, draws and displays card on click
 *
 * Props: None
 *
 * State:
 *  triggerDraw: true/false
 *  decKId: string
 *  currentCard: img url string
 *
 *  App -> Card
 *
 *
 */
function App() {
  const [triggerDraw, setTriggerDraw] = useState(false);
  // REVIEW: deckId useState(null)
  const [deckId, setDeckId] = useState("");
  const [currentCard, setCurrentCard] = useState("");

  // fetch unique deckId
  useEffect(function fetchDeckIdOnMount() {
    console.log("Inside of fetchDeckId");
    async function fetchDeckId() {
      console.log("Inside of getDeckId async");
      const resp = await axios.get(`${BASE_URL}deck/new/shuffle/?deck_count=1`);
      setDeckId(resp.data.deck_id);
    }
    fetchDeckId();
  }, []);
  // fetch card data
  useEffect(
    function fetchCardData() {
      console.log("fetchCardData is rendering");
      async function getCard() {
        console.log("fetchCardData async is firing");
        const resp = await axios.get(`${BASE_URL}deck/${deckId}/draw/?count=1`);
        const cardImage = resp.data.cards[0].image;
        console.log(cardImage);
        setCurrentCard(cardImage);
      }
      if(deckId){
        getCard();
      }
      
    },
    [triggerDraw]
  );
  // flips triggerDraw to signal fetch card
  function clickHandler() {
    setTriggerDraw(currDraw => !currDraw);
  }

  return (
    <div className="App">
      <button onClick={clickHandler}>Get a Card</button>
      {currentCard && <Card card={currentCard} />}
    </div>
  );
}

export default App;
