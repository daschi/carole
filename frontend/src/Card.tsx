import { useState } from "react";
import styled from "styled-components";
import CardSelector from "./CardSelector";
import { TarotCard } from "./constants";

const CardContainer = styled.div`
  background-color: #bf677c;
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

type CardProps = {
  onChange: (card: TarotCard) => void;
};

function Card({ onChange }: CardProps) {
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>();
  const [imgUrl, setImgUrl] = useState("");
  const handleSelectCard = (card: TarotCard) => {
    setSelectedCard(card);
    onChange(card);
  };

  return (
    <CardContainer>
      {selectedCard ? (
        <>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Wands02.jpg/696px-Wands02.jpg"
            alt="tarot card"
          />
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

export default Card;
