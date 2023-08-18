import React, { useEffect, useState } from "react";
import Table from "./Table";
import TableFooter from "./TableFooter";
import "../styles/styles.css";

const API_BASE_URL = "http://127.0.0.1:8000/api/";
export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [page, setSelectedPage] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonClicked(!buttonClicked);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}search-people/?search=${inputValue}&page=${page}`
      );

      if (!response.ok) {
        throw new Error("Failed to connect to server");
      }
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (buttonClicked && inputValue !== "") {
      setLoading(!loading);
      fetchData();
      setLoading(!loading);
      setButtonClicked(!buttonClicked);
    }
  }, [buttonClicked, page, loading]);

  const handlePageChange = (option) => {
    setLoading(true);
    setSelectedPage(option);
    setButtonClicked(!buttonClicked);
  };

  const searchResults = () => {
    if (loading) {
      return <p className="text-response">Loading...</p>;
    }
    if (!responseData) {
      return null;
    }
    if (responseData.count == 0) {
      return <p className="text-response">No results found</p>;
    }
    return (
      <div>
        <Table data={responseData.result} />
        {responseData.count > responseData.itemsPerPage && (
          <TableFooter
            range={responseData.count}
            itemsPerPage={responseData.itemsPerPage}
            onSelect={handlePageChange}
            page={page}
          />
        )}
      </div>
    );
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
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
      <div className="search-results">{searchResults()}</div>
    </div>
  );
}
