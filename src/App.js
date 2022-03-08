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
 *  CR: what is the purpose of the state? explain it here
 *  triggerDraw: true/false
 *  decKId: string
 *  currentCard: img url string
 *  allowShuffle: true/false
 *  triggerShuffle: true/false
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
  const [allowShuffle, setAllowShuffle] = useState(false);
  const [triggerShuffle, setTriggerShuffle] = useState(false);

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
      if (deckId) {
        getCard();
      }
    },
    // CR: Update this with a deckID variable
    [triggerDraw]
  );

  useEffect(
    function shuffleDeckOnClick() {
      console.log("inside standard shuffle on click");
      async function shuffleDeck() {
        console.log("inside async shuffle on click");
        await axios.get(`${BASE_URL}deck/${deckId}/shuffle/`);
      }
      if (allowShuffle) {
        shuffleDeck();
        setAllowShuffle(false);
      }
    },
    [triggerShuffle]
  )
    //CR: better click handler name
  // flips triggerDraw to signal fetch card
  function clickHandler() {
    setTriggerDraw(currDraw => !currDraw);
    setAllowShuffle(true);
  }

  // Sets the state to trigger the effect to shuffle the deck.
  function shuffleDeck() {
    setCurrentCard(currCard => null);
    setTriggerShuffle(currTrigger => !currTrigger)
    setAllowShuffle(true);
  }

  // CR: if you had to invent a piece of state, consider implementing the behavior
  // in your event listener instead

  return (
    <div className="App">
      <button onClick={clickHandler}>Get a Card</button>
      {currentCard && <Card card={currentCard} />}
      {/* {allowShuffle && <button onClick={shuffleDeck}>Shuffle</button>} */}
      <button disabled={!allowShuffle} onClick={shuffleDeck}>Shuffle</button>
    </div>
  );
}

export default App;
