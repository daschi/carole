export type TarotSpread = {
  name: string;
  numCards: number;
  intention: string;
  gridContainerConfig: string;
  gridCardConfig?: string;
};

type TarotSpreads = TarotSpread[];

const spreads: TarotSpreads = [
  {
    name: "Past, Present, Future",
    numCards: 3,
    intention:
      "Gain clarity about the direction of your life through insight into where you've been, where you are, and where you're going",
    gridContainerConfig: `grid-template-columns: repeat(3, 1fr);`,
  },
];
type SpreadSelectorProps = {
  onSelect: (spread: TarotSpread) => void;
};

function SpreadSelector({ onSelect }: SpreadSelectorProps) {
  return (
    <div style={{ margin: "20px" }}>
      <select
        defaultValue=""
        onChange={(e) => {
          const spread = spreads.find((s) => s.name === e.target.value);
          if (spread) onSelect(spread);
        }}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      >
        <option value="" disabled>
          -- Select a Tarot Spread --
        </option>
        {spreads.map((spread) => (
          <option key={spread.name} value={spread.name}>
            {spread.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SpreadSelector;
