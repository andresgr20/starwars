import { useMemo } from "react";
import ButtonGroup from "./ButtonGroup";

export default function TableFooter({ range, page, itemsPerPage, onSelect }) {
  const pages = useMemo(() => {
    return Array.from(
      { length: Math.ceil(range / itemsPerPage) },
      (_, index) => index + 1
    );
  }, [range, itemsPerPage]);
  return (
    <ButtonGroup options={pages} selectedOption={page} onSelect={onSelect} />
  );
}
