import { Link } from "react-router-dom";

import "./CharityList.css";

import Charity from "../Charity";

interface CharityListProps {
  charities: Charity[];
  searchTerm: string;
  isRandom: boolean;
}

const CharityList: React.FC<CharityListProps> = ({
  charities,
  searchTerm,
  isRandom,
}) => {
  return (
    <div>
      {charities.length > 0 && (
        <div>
          {isRandom ? (
            <div className="random-charity">Charity Organizations</div>
          ) : (
            <div className="search-results">
              Search results for:{searchTerm}
            </div>
          )}
          <div className="charity-list">
            {charities.map((charity) => (
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
      )}
    </div>
  );
};

export default CharityList;
