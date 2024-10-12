import PropTypes, { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import "./App.css";

const SpreadContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const SubmitButton = styled.button``;

function Spread({ handleSubmit }) {
  const [cards, setCards] = useState([]);

  const handleSelectCard = (position, value) => {
    const cardsUpdate = [...cards];
    cardsUpdate[position] = value;
    setCards(cardsUpdate);
  };

  return (
    <>
      <SpreadContainer>
        {[0, 1, 2].map((position) => {
          return (
            <Card
              key={position}
              onChange={(value) => handleSelectCard(position, value)}
            />
          );
        })}
      </SpreadContainer>
      {cards.length === 3 && (
        <SubmitButton onClick={() => handleSubmit(cards)}>Submit</SubmitButton>
      )}
    </>
  );
}

Spread.propTypes = {
  handleSubmit: PropTypes.func,
};

export default Spread;
