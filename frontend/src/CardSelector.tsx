import { MAJOR_ARCANA_CARDS, MINOR_ARCANA_CARDS, TarotCard } from "./constants";

type AllCards = {
  minor: TarotCard[];
  major: TarotCard[];
};

const allCards: AllCards = {
  minor: MINOR_ARCANA_CARDS,
  major: MAJOR_ARCANA_CARDS,
};

type CardSelectorProps = {
  type: keyof AllCards;
  onChange: (card: TarotCard) => void;
};

function CardSelector({ type, onChange }: CardSelectorProps) {
  const cards = allCards[type];

  return (
    <div style={{ margin: "20px" }}>
      <select
        id={`${type}-arcana`}
        onChange={(e) => {
          const card = cards.find((c) => c.value === e.target.value);
          if (card) onChange(card);
        }}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      >
        <option value="" disabled selected>
          -- Select a Card --
        </option>
        {cards.map((card) => (
          <option key={card.value} value={card.value}>
            {card.cardName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CardSelector;
