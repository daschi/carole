import { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import "./App.css";
import { TarotCard } from "./constants";
import { TarotSpread } from "./SpreadSelector";

const SpreadTitle = styled.h1`
  font-family: "Roboto";
`;

const SpreadIntention = styled.p`
  font-family: "Roboto";
  font-size: 1.25rem;
  font-weight: bold;
`;

const SpreadContainer = styled.div<{ gridTemplateConfig: string }>`
  display: grid;
  ${(props) => props.gridTemplateConfig}
`;

const SubmitButton = styled.button``;

type SpreadProps = {
  handleSubmit: (cards: TarotCard[]) => void;
  spread?: TarotSpread;
};

function Spread({ spread, handleSubmit }: SpreadProps): JSX.Element {
  const [cards, setCards] = useState<TarotCard[]>([]);

  const handleSelectCard = (position: number, card: TarotCard) => {
    const cardsUpdate = [...cards];
    cardsUpdate[position] = card;
    setCards(cardsUpdate);
  };

  if (!spread) return <></>;

  const { numCards, name, intention, gridContainerConfig } = spread;

  return (
    <>
      <SpreadTitle>{name}</SpreadTitle>
      <SpreadIntention>{intention}</SpreadIntention>
      <SpreadContainer gridTemplateConfig={gridContainerConfig}>
        {Array.from(Array(numCards).keys()).map((position) => {
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
