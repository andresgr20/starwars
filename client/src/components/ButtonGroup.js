export default function ButtonGroup({ options, selectedOption, onSelect }) {
  return (
    <div className="button-group">
      {options.map((option, index) => (
        <button
          key={index}
          className={`button ${selectedOption === option ? "active" : ""}`}
          onClick={() => onSelect()}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
