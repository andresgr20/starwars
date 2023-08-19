import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import TableWithFooter from "./TableWithFooter";
import { API_BASE_URL } from "../config";

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [page, setSelectedPage] = useState(1);
  const [previousSearch, setPreviousSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (previousSearch !== inputValue) {
      setSelectedPage(1);
    }
    setButtonClicked(!buttonClicked);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}get-people/?search=${inputValue}&page=${page}`
      );

      if (!response.ok) {
        throw new Error("Failed to connect to server");
      }
      const data = await response.json();
      if (data.error) {
        // Show the error to the frontend maybe?
      } else {
        setPreviousSearch(inputValue);
        setResponseData(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (buttonClicked && inputValue !== "") {
      setLoading(true);
      fetchData();
      setLoading(false);
      setButtonClicked(!buttonClicked);
    }
  }, [buttonClicked, page, loading]);

  const handlePageChange = (option) => {
    setLoading(true);
    setSelectedPage(page + option);
    setButtonClicked(!buttonClicked);
  };

  const searchResults = () => {
    if (loading) {
      return <p className="text-response">Loading...</p>;
    }
    if (!responseData) {
      return null;
    }
    if (responseData.result.length === 0) {
      return <p className="text-response">No results found</p>;
    }
    return <TableWithFooter data={responseData} onSelect={handlePageChange} />;
  };

  return (
    <div className="search">
      <div className="search-settings">
        <div className="title-search">Search for a character</div>
        <form onSubmit={handleSubmit} className="input-bar">
          <input
            type="text"
            value={inputValue}
            placeholder="Anakin Kenobi"
            onChange={(e) => setInputValue(e.target.value)}
            className="search-bar"
          />
          <button type="submit" className="normal-button">
            Submit
          </button>
        </form>
      </div>
      <div className="search-results">{searchResults()}</div>
    </div>
  );
}
