import "./styles/styles.css";
import ButtonGroup from "./components/ButtonGroup";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import logo from "./logo.png";
import TableWithFooter from "./components/TableWithFooter";
import { API_BASE_URL } from "./config";

function App() {
  const options = ["People", "Planets", "Starships"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [page, setSelectedPage] = useState(1);

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const cacheKey = `${url}?page=${page}`;
        const cacheData = sessionStorage.getItem(cacheKey);
        if (cacheData) {
          setData(JSON.parse(cacheData));
          setLoading(false);
          return;
        }
        if (page > 1) {
          url = url + "?page=" + page;
        }
        const response = await fetch(url);
        const responseJSON = await response.json();
        setData(responseJSON);
        sessionStorage.setItem(cacheKey, JSON.stringify(responseJSON));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    switch (selectedOption) {
      case "People":
        fetchData(`${API_BASE_URL}get-people`);
        break;
      case "Planets":
        fetchData(`${API_BASE_URL}get-planets`);
        break;
      default:
        fetchData(`${API_BASE_URL}get-starships`);
        break;
    }
    return;
  }, [selectedOption, page]);

  const handleOptionSelect = (option) => {
    setLoading(true);
    setSelectedPage(1);
    setSelectedOption(option);
  };

  const handlePageChange = (option) => {
    setLoading(true);
    setSelectedPage(page + option);
  };

  return (
    <div className="App">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div>
        <div>
          <ButtonGroup
            options={options}
            selectedOption={selectedOption}
            onSelect={handleOptionSelect}
          />
        </div>
        {loading ? (
          <p className="text-response">Loading... </p>
        ) : (
          <TableWithFooter data={data} onSelect={handlePageChange} />
        )}
      </div>
      <Search />
    </div>
  );
}

export default App;
