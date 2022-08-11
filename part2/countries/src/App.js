// TODO 2.14
import { useState, useEffect } from "react";
import Info from "./components/Info";
import ListItem from "./components/ListItem";
import Weather from "./components/Weather";
import countryService from "./services/countryService";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [shownCountryIndex, setShownCountry] = useState(-1);

  useEffect(() => {
    countryService.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleShownCountry = (country) => {
    const countryIndex = countries.findIndex(
      (countryFromList) => countryFromList.name.common === country.name.common
    );
    setShownCountry(countryIndex);
  };

  const handleShownCountryReturn = () => {
    setShownCountry(-1);
  };

  const filtered = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      {filtered.length === 1 ? (
        <div>
          <Info country={filtered[0]} />
          <Weather country={filtered[0]} />
        </div>
      ) : filtered.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : shownCountryIndex === -1 ? (
        <div>
          {filtered.map((country) => (
            <ListItem
              key={country.cca2}
              country={country}
              onClick={() => handleShownCountry(country)}
            />
          ))}
        </div>
      ) : (
        <div>
          <Info country={countries[shownCountryIndex]} />
          <Weather country={countries[shownCountryIndex]} />
          <button onClick={handleShownCountryReturn}>return</button>
        </div>
      )}
    </div>
  );
};

export default App;
