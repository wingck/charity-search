import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./SearchComponent.css";
import Charity from "../Charity";

const terms = [
  "aapi-led",
  "adoption",
  "afghanistan",
  "animals",
  "art",
  "athletics",
  "autism",
  "black-led",
  "buddhism",
  "cancer",
  "cats",
  "christianity",
  "climate",
  "conservation",
  "coronavirus",
  "culture",
  "dance",
  "disabilities",
  "disease",
  "dogs",
  "education",
  "environment",
  "filmandtv",
  "food-security",
  "freepress",
  "gender-equality",
  "health",
  "hinduism",
  "housing",
  "humans",
  "hurricane-ian",
  "immigrants",
  "indigenous-led",
  "indigenous-peoples",
  "islam",
  "judaism",
  "justice",
  "latine-led",
  "legal",
  "lgbt",
  "libraries",
  "mental-health",
  "museums",
  "music",
  "oceans",
  "parks",
  "poverty",
  "racial-justice",
  "radio",
  "refugees",
  "religion",
  "research",
  "science",
  "seniors",
  "space",
  "theater",
  "transgender",
  "ukraine",
  "veterans",
  "votingrights",
  "water",
  "wildfires",
  "wildlife",
  "women-led",
  "womens-health",
  "youth",
];

interface SearchComponentProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  setSearchResults: (searchResults: Charity[]) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  searchTerm,
  setSearchTerm,
  setSearchResults,
}) => {
  const [autocompleteResults, setAutocompleteResults] = useState<string[]>([]);

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchQuery = event.target.value;
    setSearchTerm(searchQuery);
    if (searchQuery.length === 0) {
      setAutocompleteResults([]);
      return;
    }
    const results = terms
      .filter((term) => term.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 10);
    setAutocompleteResults(results);
  };

  const handleAutocompleteResultClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const target = event.target as HTMLButtonElement;
    const result = target.value;
    setSearchTerm(result);
    setAutocompleteResults([]);
  };

  const handleSearchButtonClick = () => {
    axios
      .get(
        `https://partners.every.org/v0.2/search/${searchTerm}?apiKey=${
          import.meta.env.VITE_API_KEY
        }&take=50`
      )
      .then((response) => {
        console.log(response.data);
        setSearchResults(response.data.nonprofits);
      });
  };

  return (
    <div className="search-component">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder="Search for a charity..."
      ></input>
      <Link to="/" onClick={handleSearchButtonClick}>
        Search
      </Link>
      {autocompleteResults.length > 0 && (
        <div className="autocomplete-results">
          {autocompleteResults.map((result, index) => (
            <button
              key={index}
              className="autocomplete-result"
              value={result}
              onClick={handleAutocompleteResultClick}
            >
              {result}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
