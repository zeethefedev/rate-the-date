import React, { useState } from "react";
import SVGIcon from "./component/SVGIcon";
import { INITIAL } from "./utils/constant";
const RATING_LENGTH = 5;
function RatingForm({ question = INITIAL.RATING_QUESTION }) {
  const [ratings, setRatings] = useState(Array(RATING_LENGTH).fill(false));

  const handleClickStar = (index) => {
    const checkedRating = Array(index + 1).fill(true);
    const uncheckedRating = Array(RATING_LENGTH - index - 1).fill(false);
    setRatings([...checkedRating, ...uncheckedRating]);
    if (index === 0 && ratings.filter((rating) => rating).length === 1) {
      setRatings([!ratings[0], ...ratings.slice(1)]);
    }
  };

  return (
    <div>
      <h1>{question}</h1>
      <div>
        {ratings.map((rating, index) => (
          <div key={index} onClick={() => handleClickStar(index)}>
            <SVGIcon icon="star" checked={rating} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatingForm;
