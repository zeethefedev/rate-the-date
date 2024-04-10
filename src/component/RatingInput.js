import React, { useEffect, useState } from "react";
import SVGIcon from "./SVGIcon";
import { FORM_MODE, INITIAL } from "../utils/constant";

const RATING_LENGTH = 5;
function RatingInput(props) {
  const {
    questionValue = INITIAL.RATING_QUESTION,
    handleInputChange,
    required,
    index,
    editInput,
    mode,
    error,
    errorMessage = "please enter a valid answer",
  } = props;
  const [ratings, setRatings] = useState(Array(RATING_LENGTH).fill(false));

  const handleClickStar = (index) => {
    if (mode === FORM_MODE.RESPONSE) {
      const checkedRating = Array(index + 1).fill(true);
      const uncheckedRating = Array(RATING_LENGTH - index - 1).fill(false);
      setRatings([...checkedRating, ...uncheckedRating]);
      if (index === 0 && ratings.filter((rating) => rating).length === 1) {
        setRatings([!ratings[0], ...ratings.slice(1)]);
      }
    }
  };

  useEffect(
    (event) => {
      const ratingScore = `${
        ratings.filter((rating) => rating).length
      }/${RATING_LENGTH}`;
      handleInputChange(event, ratingScore);
    },
    [ratings]
  );

  return (
    <div key={index} className="field-wrapper">
      {editInput}
      <h1>
        {questionValue}
        {required && <span>*</span>}
      </h1>
      <div className="star-wrapper">
        {ratings.map((rating, index) => (
          <div key={index} onClick={() => handleClickStar(index)}>
            <SVGIcon
              icon="star"
              checked={rating}
              disabled={mode === FORM_MODE.QUESTION}
            />
          </div>
        ))}
      </div>
      {error && mode === FORM_MODE.RESPONSE && (
        <div>{errorMessage || INITIAL.ERROR_MESSAGE}</div>
      )}
    </div>
  );
}

export default RatingInput;
