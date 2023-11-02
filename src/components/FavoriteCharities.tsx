import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Charity from "../Charity";

import "./FavoriteCharities.css";

const FavoriteCharities = () => {
  const [favorites, setFavorites] = useState<Charity[]>([]);

  useEffect(() => {
    // Get favorite charities from local storage
    const favoriteCharities = JSON.parse(
      localStorage.getItem("favoriteCharities") || "[]"
    );
    setFavorites(favoriteCharities);
  }, []);

  return (
    <div>
      <h1>Favorite Charities</h1>
      <div className="charity-list">
        {favorites.map((charity) => (
          <div key={charity.ein} className="charity-item">
            <Link to={`/charity/${charity.ein}`}>
              <img
                src={
                  charity.logoUrl ||
                  "https://charity-finder.vitochan.com/assets/donateLogo-96b99806.svg"
                }
                alt={`${charity.name} logo`}
                className="logo"
              />
              <div className="details">
                <div className="name">{charity.name}</div>
                <div className="location">{charity.location}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCharities;
