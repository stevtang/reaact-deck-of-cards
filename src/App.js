import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";
import axios from "axios";
import { click } from "@testing-library/user-event/dist/click";
const BASE_URL = "http://deckofcardsapi.com/api/";

function App() {
  const [triggerDraw, setTriggerDraw] = useState(false)
  const [deckId, setDeckId] = useState("");
  const [currentCard, setCurrentCard] = useState("");

  useEffect(function fetchDeckId() {
    console.log("Inside of fetchDeckId")
    async function getDeckId() {
      console.log("Inside of getDeckId async")
      const resp = await axios.get(`${BASE_URL}deck/new/shuffle/?deck_count=1`);
      setDeckId(resp.data.deck_id);
    }
    getDeckId();
  }, []);

  useEffect(function fetchCardData() {
    console.log("fetchCardData is rendering")
    async function getCard() {
      console.log("fetchCardData async is firing")
      const resp = await axios.get(`${BASE_URL}deck/${deckId}/draw/?count=1`)
      console.log(resp.data.cards[0].image)
      setCurrentCard(resp.data.cards[0].image)
    }
    getCard()
    setTriggerDraw(false)
  },[triggerDraw]);

  
  function clickHandler(){
    setTriggerDraw(true);
  }

  return (
    <div className="App">
      <button onClick={clickHandler}>Get a Card</button>
      <Card card={currentCard} />
    </div>
  );
}

export default App;


