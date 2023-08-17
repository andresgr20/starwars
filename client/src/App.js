import "./App.css";
import ButtonGroup from "./components/ButtonGroup";
import Search from "./components/Search";
import Table from "./components/Table";
import { useEffect, useState } from "react";

function App() {
  const options = ["People", "Planet", "Starships"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [people, setPeople] = useState(null);
  const [planets, setPlanets] = useState(null);
  const [starships, setStartships] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people/");
        const response1 = await response.json();
        setPeople(response1);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
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
            <Table data={displayedData.results} />
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
