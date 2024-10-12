import { useState } from "react";

import styled from "styled-components";
import Spread from "./Spread";
import Markdown from "react-markdown";
import "./App.css";

const Intro = styled.h1`
  font-family: "Roboto";
`;

// const Interpretation = styled.div``;

const AppContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

function App() {
  const [interpretation, setInterpretation] = useState();

  const handleSubmit = async (cards) => {
    try {
      const user_question =
        "What should I consider before I head into this weekend?";
      const tarot_spread = "Past, Present, Future";

      // Send request to Flask API
      const response = await fetch("http://127.0.0.1:5000/interpret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cards: cards,
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

  return (
    <AppContainer>
      <Intro>Past, Present, Future Spread</Intro>
      <Spread handleSubmit={handleSubmit} />
      {interpretation && <Markdown>{interpretation}</Markdown>}
    </AppContainer>
  );
}

export default App;
