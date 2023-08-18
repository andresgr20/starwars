import "../styles/styles.css";
export default function ButtonGroup({ options, selectedOption, onSelect }) {
  return (
    <div className="button-group">
      {options.map((option, index) => (
        <button
          key={index}
          className={`button-grouped ${
            selectedOption === option ? "active" : "inactive"
          }`}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
