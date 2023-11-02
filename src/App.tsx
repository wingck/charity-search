import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";

import SearchComponent from "./components/SearchComponent";
import CharityList from "./components/CharityList";
import CharityDetail from "./components/CharityDetail";
import FavoriteCharities from "./components/FavoriteCharities";

import Charity from "./Charity";

import "./App.css";

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

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Charity[]>([]);
  const [youMayLike, setYouMayLike] = useState<Charity[]>([]);

  const handleLogoClick = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  useEffect(() => {
    const randomTerm = terms[Math.floor(Math.random() * terms.length)];

    axios
      .get(
        `https://partners.every.org/v0.2/search/${randomTerm}?apiKey=${
          import.meta.env.VITE_API_KEY
        }&take=50`
      )
      .then((response) => {
        console.log(response.data);
        setYouMayLike(response.data.nonprofits);
      });
  }, []);

  return (
    <Router>
      <header>
        <Link to="/" onClick={handleLogoClick}>
          <h1>Charity Finder</h1>
        </Link>
        <SearchComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSearchResults={setSearchResults}
        />
        <div className="favorite">
          <a href="/favorites">Favorites</a>
        </div>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <CharityList
              charities={searchResults.length > 0 ? searchResults : youMayLike}
              searchTerm={searchTerm}
              isRandom={searchResults.length === 0}
            />
          }
        />
        <Route path="/charity/:id" element={<CharityDetail />} />
        <Route path="/favorites" element={<FavoriteCharities />} />
      </Routes>
    </Router>
  );
}

export default App;
