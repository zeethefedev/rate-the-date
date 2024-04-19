import React, { useEffect, useState } from "react";
import SVGIcon from "./SVGIcon";
import { FORM_MODE, INITIAL } from "../utils/constant";

const RATING_LENGTH = 5;
function RatingInput(props) {
  const {
    questionValue = INITIAL.RATING_QUESTION,
    inputValue,
    handleInputChange,
    required,
    index,
    editInput,
    mode,
    error,
    errorMessage = "please enter a valid answer",
  } = props;

  const [ratings, setRatings] = useState(Array(RATING_LENGTH).fill(false));
  const [assignedSaved, setAssignedSaved] = useState(false);

  useEffect(() => {
    if (inputValue && !assignedSaved) {
      const savedResponse = Number(inputValue[0]);
      const savedRatings = [
        ...Array(savedResponse).fill(true),
        ...Array(RATING_LENGTH - savedResponse).fill(false),
      ];
      setRatings(savedRatings);
      setAssignedSaved(true);
    }
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
        <h1>
          {questionValue}
          {required && <span>*</span>}
        </h1>
        <div className="star-wrapper">
          {ratings.map((rating, index) => (
            <div key={index} onClick={() => handleClickStar(index)}>
              <SVGIcon
                icon={rating ? "star-checked" : "star-unchecked"}
                // checked={rating}
                disabled={mode === FORM_MODE.QUESTION}
              />
            </div>
          ))}
        </div>
        {error && <div>{errorMessage || INITIAL.ERROR_MESSAGE}</div>}
      </div>
      {editInput}
    </div>
  );
}

export default RatingInput;
