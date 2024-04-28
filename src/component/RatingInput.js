import React, { useEffect, useState } from "react";
import SVGIcon from "./SVGIcon";
import { FORM_MODE, INITIAL } from "../utils/constant";

const RATING_LENGTH = 5;
function RatingInput(props) {
  const {
    questionValue,
    inputValue,
    handleInputChange,
    required,
    index,
    editInput,
    mode,
    error,
    errorMessage,
  } = props;

  const [ratings, setRatings] = useState(Array(RATING_LENGTH).fill(false));
  const [hoverRatings, setHoverRating] = useState(
    Array(RATING_LENGTH).fill(false)
  );
  const [assignedSaved, setAssignedSaved] = useState(false);

  useEffect(() => {
    if (inputValue && !assignedSaved) {
      const savedResponse = Number(inputValue[0]);
      const savedRatings = [
        ...Array(savedResponse).fill(true),
        ...Array(RATING_LENGTH - savedResponse).fill(false),
      ];
      setRatings(savedRatings);
    }
    setAssignedSaved(true);
  }, [inputValue]);

  const handleClickStar = (index) => {
    if (mode === FORM_MODE.RESPONSE || mode === FORM_MODE.PREVIEW) {
      const checkedRating = Array(index + 1).fill(true);
      const uncheckedRating = Array(RATING_LENGTH - index - 1).fill(false);
      setRatings([...checkedRating, ...uncheckedRating]);
      if (index === 0 && ratings.filter((rating) => rating).length === 1) {
        setRatings([!ratings[0], ...ratings.slice(1)]);
      }
    }
  };

  const handleHoverStar = (index) => {
    if (mode === FORM_MODE.RESPONSE || mode === FORM_MODE.PREVIEW) {
      const checkedRating = Array(index + 1).fill(true);
      const uncheckedRating = Array(RATING_LENGTH - index - 1).fill(false);
      setHoverRating([...checkedRating, ...uncheckedRating]);
      if (index === 0 && hoverRatings.filter((rating) => rating).length === 1) {
        setHoverRating([!hoverRatings[0], ...hoverRatings.slice(1)]);
      }
    }
  };

  useEffect(
    (event) => {
      if (assignedSaved) {
        const ratingScore = `${
          ratings.filter((rating) => rating).length
        }/${RATING_LENGTH}`;
        handleInputChange(event, ratingScore);
      }
    },
    [ratings]
  );

  return (
    <div key={index} className="field-wrapper">
      <div className="form-wrapper">
        <h3 className="input-label">
          {questionValue}
          {required && <span>*</span>}
        </h3>
        <div className="star-wrapper">
          {hoverRatings.map((rating, index) => (
            <div
              key={index}
              // className="clickable"
              // onClick={() => handleClickStar(index)}
              onMouseEnter={() => handleHoverStar(index)}
              // onMouseLeave={} //reset
            >
              <SVGIcon
                icon={rating ? "star-checked" : "star-unchecked"}
                width="24px"
                height="24px"
                disabled={mode === FORM_MODE.QUESTION}
              />
            </div>
          ))}
        </div>
        {error && (
          <div className="error-text error-message-wrapper">
            <SVGIcon icon="error" height="1em" width="1em" />
            {errorMessage || INITIAL.ERROR_MESSAGE}
          </div>
        )}
      </div>
      {editInput}
    </div>
  );
}

export default RatingInput;
