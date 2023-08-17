import React, { useEffect, useState } from "react";
import Table from "./Table";

const API_BASE_URL = "http://127.0.0.1:8000/api/";
export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          API_BASE_URL + `search?page=${inputValue}`
        );
        const data = await response.json();
        setResponseData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [setResponseData]);

  const searchResults = () => {
    if (responseData.count == 0) {
      return <p>No results found</p>;
    }
    return <Table data={data.result} />;
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            placeholder="Anakin Kenobi"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        {clicked ? loading ? <p>Loading ...</p> : searchResults() : null}
      </div>
    </div>
  );
}
