import "../styles/styles.css";
export default function TableFooter({ prev, next, goToPage }) {
  return (
    <div className="navigation">
      <button
        onClick={() => goToPage(-1)}
        disabled={!prev}
        className={!prev ? "nav-button-disabled" : "nav-button"}
      >
        &lt;
      </button>
      <button
        onClick={() => goToPage(1)}
        disabled={!next}
        className={!next ? "nav-button-disabled" : "nav-button"}
      >
        &gt;
      </button>
    </div>
  );
}
