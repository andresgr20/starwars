import "./App.css";
import ButtonGroup from "./components/ButtonGroup";
import Search from "./components/Search";
import Table from "./components/Table";
import { useEffect, useState } from "react";

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
    const fetchData = async (url, sette) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setter(data);
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
    setSelectedOption(option);
    setLoading(true);
  };

  const handlePageChange = (option) => {
    setSelectedPage(option);
    setLoading(true);
  };

  const dataMaps = {
    People: people,
    Planets: planets,
    Starships: starships,
  };

  const displayedData = dataMaps[selectedOption];

  return (
    <div className="App">
      <div className="title">War of the Stars </div>
      <div>
        <div>
          <ButtonGroup
            options={options}
            selectedOption={selectedOption}
            onSelect={handleOptionSelect}
          />
        </div>
        <div>
          {loading ? (
            <p>Loading ... </p>
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
      </div>
      <div>
        <Search />
      </div>
    </div>
  );
}

export default App;
