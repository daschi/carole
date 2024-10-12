import PropTypes from "react";
import { MAJOR_ARCANA_CARDS, MINOR_ARCANA_CARDS } from "./constants";

const allCards = {
  minor: MINOR_ARCANA_CARDS,
  major: MAJOR_ARCANA_CARDS,
};

function CardSelector({ type, onChange }) {
  const cards = allCards[type];

  return (
    <div style={{ margin: "20px" }}>
      <select
        id={`${type}-arcana`}
        onChange={(e) => {
          const card = cards.find((c) => c.value === e.target.value);
          onChange(card);
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

CardSelector.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
};

export default CardSelector;
