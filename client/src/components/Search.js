import React, { useEffect, useState } from "react";
export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  // Parse and clean data so it fits
  // pass it to the back end and the parse and verify there too
  const handleSubmit = async (event) => {
    // event.preventDefault();
    // try {
    //   // hit endpoint
    //   const query = await fetch("https://swapi.dev/api/people/");
    //   const responseJSON = await query.json;
    //   setResponseData(responseJSON);
    //   setLoading(false);
    // } catch (error) {
    //   //
    // }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const searchResults = (data) => {
    <div>{data.mesage}</div>;
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
      <div>{loading ? <p>Loading ...</p> : searchResults(responseData)}</div>
    </div>
  );
}
