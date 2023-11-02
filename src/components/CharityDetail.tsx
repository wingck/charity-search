import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Charity from "../Charity";

import "./CharityDetail.css";

const CharityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [charity, setCharity] = useState<Charity | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(
        `https://partners.every.org/v0.2/nonprofit/${id}?apiKey=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((response) => {
        setCharity(response.data.data.nonprofit);
      })
      .catch((error) => {
        console.error("There was an error fetching the charity data!", error);
      });
  }, [id]);

  useEffect(() => {
    if (charity) {
      const favoriteCharities = JSON.parse(
        localStorage.getItem("favoriteCharities") || "[]"
      );
      const alreadyExists = favoriteCharities.some(
        (favoriteCharity: Charity) => favoriteCharity.ein === charity.ein
      );
      setIsFavorite(alreadyExists);
    }
  }, [charity]);

  const handleFavBtn = () => {
    if (!isFavorite) {
      const favoriteCharities = JSON.parse(
        localStorage.getItem("favoriteCharities") || "[]"
      );
      favoriteCharities.push(charity);
      localStorage.setItem(
        "favoriteCharities",
        JSON.stringify(favoriteCharities)
      );
      setIsFavorite(true);
    } else {
      if (charity) {
        const favoriteCharities = JSON.parse(
          localStorage.getItem("favoriteCharities") || "[]"
        );
        const newFavoriteCharities = favoriteCharities.filter(
          (favoriteCharity: Charity) => favoriteCharity.ein !== charity.ein
        );
        localStorage.setItem(
          "favoriteCharities",
          JSON.stringify(newFavoriteCharities)
        );
        setIsFavorite(false);
      }
    }
  };

  useEffect(() => {}, [isFavorite]);

  if (!charity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="charity-detail">
      {charity.coverImageUrl && (
        <img
          className="cover-image"
          src={charity.coverImageUrl}
          alt={`${charity.name} Cover Image`}
        />
      )}
      <div className="charity-header">
        <img
          className="logo"
          src={
            charity.logoUrl ||
            "https://charity-finder.vitochan.com/assets/donateLogo-96b99806.svg"
          }
          alt={`${charity.name} logo`}
        />
        <h1>{charity.name}</h1>
      </div>
      <p>{charity.description}</p>
      <p>{charity.locationAddress}</p>
      <button onClick={handleFavBtn}>
        {isFavorite ? "Remove from Favorites" : "Save to Favorites"}
      </button>
    </div>
  );
};

export default CharityDetail;
