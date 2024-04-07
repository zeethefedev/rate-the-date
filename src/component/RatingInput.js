import React, { useState } from "react";
import SVGIcon from "./SVGIcon";
import { FORM_MODE, INITIAL } from "../utils/constant";

const RATING_LENGTH = 5;
function RatingInput({
  mode = FORM_MODE.QUESTION,
  questionValue = INITIAL.RATING_QUESTION,
  index,
  editInput,
}) {
  const [ratings, setRatings] = useState(Array(RATING_LENGTH).fill(false));

  const handleClickStar = (index) => {
    // if(mode === FORM_MODE.RESPONSE)
    const checkedRating = Array(index + 1).fill(true);
    const uncheckedRating = Array(RATING_LENGTH - index - 1).fill(false);
    setRatings([...checkedRating, ...uncheckedRating]);
    if (index === 0 && ratings.filter((rating) => rating).length === 1) {
      setRatings([!ratings[0], ...ratings.slice(1)]);
    }
  };

  return (
    <div key={index} className="field-wrapper">
      {editInput}
      <h1>{questionValue}</h1>
      <div className="star-wrapper">
        {ratings.map((rating, index) => (
          <div key={index} onClick={() => handleClickStar(index)}>
            <SVGIcon icon="star" checked={rating} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatingInput;
