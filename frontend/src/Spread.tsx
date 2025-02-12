import { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import "./App.css";
import { TarotCard } from "./constants";

const SpreadContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const SubmitButton = styled.button``;

type SpreadProps = {
  handleSubmit: (cards: TarotCard[]) => void;
};

function Spread({ handleSubmit }: SpreadProps): JSX.Element {
  const [cards, setCards] = useState<TarotCard[]>([]);

  const handleSelectCard = (position: number, card: TarotCard) => {
    const cardsUpdate = [...cards];
    cardsUpdate[position] = card;
    setCards(cardsUpdate);
  };

  return (
    <>
      <SpreadContainer>
        {[0, 1, 2].map((position) => {
          return (
            <Card
              key={position}
              onChange={(card: TarotCard) => handleSelectCard(position, card)}
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

export default Spread;
