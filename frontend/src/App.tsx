import { useState } from "react";

import styled from "styled-components";
import Spread from "./Spread";
import Markdown from "react-markdown";
import "./App.css";
import { TarotCard } from "./constants";
import SpreadSelector, { TarotSpread } from "./SpreadSelector";

const Intro = styled.h2`
  font-family: "Roboto";
`;

// const Interpretation = styled.div``;

const AppContainer = styled.div`
  display: flex;
  flex-flow: column;
  background-color: #facada;
  padding: 3rem;
`;

function App(): JSX.Element {
  const [interpretation, setInterpretation] = useState<string>();
  const [spread, setSpread] = useState<TarotSpread>();

  const handleSubmit = async (cards: TarotCard[]) => {
    try {
      const user_question =
        "What should I consider before I head into this weekend?";
      const tarot_spread = "Past, Present, Future";

      // Send request to Flask API
      const response = await fetch("http://127.0.0.1:5001/interpret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cards: cards.map((card) => card.value),
          question: user_question,
          spread: tarot_spread,
        }),
      });
      const interpretation = await response.json();

      setInterpretation(interpretation); // You can handle the chat completion response here
    } catch (error) {
      console.error("Error while calling the API: ", error);
      setInterpretation(`There was an error retrieving the response: ${error}`);
    }
  };

  const handleSelect = (spread: TarotSpread) => {
    setSpread(spread);
  };

  return (
    <AppContainer>
      <Intro>Select a Spread</Intro>
      <SpreadSelector onSelect={handleSelect} />
      <Spread spread={spread} handleSubmit={handleSubmit} />
      {interpretation && <Markdown>{interpretation}</Markdown>}
    </AppContainer>
  );
}

export default App;
