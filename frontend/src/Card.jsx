import PropTypes, { useState } from "react";
import styled from "styled-components";
import CardSelector from "./CardSelector";

const CardContainer = styled.div`
  background-color: #d9d9d9;
  border-radius: 8px;
  display: flex;
  justify-content: space-evenly;
  border: 1px solid black;
  height: 30em;
  width: 16em;
  flex-flow: column nowrap;
  padding: 1em;
  margin: 1em;
`;

const SelectCardText = styled.label`
  font-family: "Poppins", sans-serif;
  text-align: center;
  align-self: top;
`;

function Card({ onChange }) {
  const [selectedCard, setSelectedCard] = useState();
  const handleSelectCard = (card) => {
    setSelectedCard(card);
    onChange(card.value);
  };

  return (
    <CardContainer>
      {selectedCard ? (
        <>
          <div>You selected {selectedCard.cardName}</div>
          <button onClick={() => setSelectedCard(null)}>
            Select a different card
          </button>
        </>
      ) : (
        <>
          <SelectCardText>Select one card:</SelectCardText>
          <CardSelector type="major" onChange={handleSelectCard} />
          <CardSelector type="minor" onChange={handleSelectCard} />
        </>
      )}
    </CardContainer>
  );
}

Card.propTypes = {
  onChange: PropTypes.func,
};

export default Card;
