import { useState, useEffect } from "react";
import "./App.css";
import Card from "/Card";
import axios from "axios";
const BASE_URL = "http://deckofcardsapi.com/api/";

function App() {
  const [deckId, setDeckId] = useState("");

  useEffect(function fetchDeckId() {
    async function getDeckId() {
      const resp = axios.get(`${BASE_URL}deck/new/`);
      setDeckId(resp.data.deck_id);
    }
  }, []);

  useEffect(function fetchCardData() {
    async function getCard() {
      const resp = axios.get(`${BASE_URL}deck/${deckId}/draw/?count=1`)
    }
  });

  return (
    <div className="App">
      <button onClick={getCard}>Get a Card</button>
      <Card card={resp.data.cards.image} />
    </div>
  );
}

export default App;
