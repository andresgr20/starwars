import "./styles/styles.css";
import ButtonGroup from "./components/ButtonGroup";
import Search from "./components/Search";
import Table from "./components/Table";
import { useEffect, useState } from "react";
import TableFooter from "./components/TableFooter";
import logo from "./logo.png";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

function App() {
  const options = ["People", "Planets", "Starships"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState(null);
  const [planets, setPlanets] = useState(null);
  const [starships, setStarships] = useState(null);
  const [page, setSelectedPage] = useState(1);

  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const cacheKey = `${url}?page=${page}`;

        const cacheData = sessionStorage.getItem(cacheKey);
        if (cacheData) {
          setter(JSON.parse(cacheData));
          setLoading(false);
          return;
        }
        const response = await fetch(url);
        const data = await response.json();

        sessionStorage.setItem(cacheKey, JSON.stringify(data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    switch (selectedOption) {
      case "People":
        fetchData(`${API_BASE_URL}get-people?page=${page}`, setPeople);
        break;
      case "Planets":
        fetchData(`${API_BASE_URL}get-planets?page=${page}`, setPlanets);
        break;
      default:
        fetchData(`${API_BASE_URL}get-starships?page=${page}`, setStarships);
        break;
    }
  }, [selectedOption, setPeople, setPlanets, setStarships, page]);

  const handleOptionSelect = (option) => {
    setLoading(true);
    setSelectedOption(option);
  };

  const handlePageChange = (option) => {
    setLoading(true);
    setSelectedPage(option);
  };

  const dataMaps = {
    People: people,
    Planets: planets,
    Starships: starships,
  };

  const displayedData = dataMaps[selectedOption];

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
          <div>
            <Table data={displayedData.result} selected={selectedOption} />
            <TableFooter
              range={displayedData.count}
              page={page}
              itemsPerPage={displayedData.itemsPerPage}
              onSelect={handlePageChange}
            />
          </div>
        )}
      </div>
      <Search />
    </div>
  );
}

export default App;
