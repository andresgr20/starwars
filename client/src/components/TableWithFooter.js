import "../styles/styles.css";
import Table from "./Table";
import TableFooter from "./TableFooter";

export default function TableWithFooter({ data, onSelect }) {
  return (
    <div>
      <Table data={data.result} />
      {(data.previous || data.next) && (
        <TableFooter
          prev={data.previous}
          next={data.next}
          goToPage={onSelect}
        />
      )}
    </div>
  );
}
