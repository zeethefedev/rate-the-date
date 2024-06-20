import React, { useEffect, useState } from "react";
import SVGIcon from "./SVGIcon";
import { FORM_MODE } from "../utils/constant";
import Message from "./Message";

const RATING_LENGTH = 5;
function RatingInput(props) {
  const {
    inputValue,
    handleInputChange,
    editInput,
    mode,
    error,
    isMobile,
    data,
  } = props;

  const { value, required, errorMessage } = data;

  const [ratings, setRatings] = useState(Array(RATING_LENGTH).fill(false));
  const [hoverRatings, setHoverRating] = useState(
    Array(RATING_LENGTH).fill(false)
  );
  const [assignedSaved, setAssignedSaved] = useState(false);
  const isResponsePreviewForm = [
    FORM_MODE.RESPONSE,
    FORM_MODE.PREVIEW,
  ].includes(mode);

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

  const handleChangeRatings = (index) => {
    const checkedRating = Array(index + 1).fill(true);
    const uncheckedRating = Array(RATING_LENGTH - index - 1).fill(false);
    if (isMobile) {
      setRatings([...checkedRating, ...uncheckedRating]);
      if (index === 0 && ratings.filter((rating) => rating).length === 1) {
        setRatings([!ratings[0], ...ratings.slice(1)]);
      }
    } else {
      setHoverRating([...checkedRating, ...uncheckedRating]);
      if (index === 0 && hoverRatings.filter((rating) => rating).length === 1) {
        setHoverRating([!hoverRatings[0], ...hoverRatings.slice(1)]);
      }
    }
  };

  const handleHoverStar = (index) => {
    if (!isMobile && isResponsePreviewForm) {
      handleChangeRatings(index);
    }
  };

  const resetHoverStar = () => {
    !isMobile && setHoverRating(ratings);
  };

  const handleClickStar = (index) => {
    if (!isMobile) {
      if (isResponsePreviewForm) {
        setRatings(hoverRatings);
      }
    } else {
      handleChangeRatings(index);
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
      setHoverRating(ratings);
    },
    [ratings]
  );

  return (
    <div className="field-wrapper">
      <div className="form-wrapper">
        <h3 className="input-label">
          {value}
          {required && <span>*</span>}
        </h3>
        <div className="star-wrapper">
          {hoverRatings.map((rating, index) => (
            <div
              key={index}
              onClick={() => handleClickStar(index)}
              onMouseEnter={() => handleHoverStar(index)}
              onMouseLeave={resetHoverStar} //reset
            >
              <SVGIcon
                icon={rating ? "star-checked" : "star-unchecked"}
                width="24px"
                height="24px"
                disabled={!isResponsePreviewForm}
              />
            </div>
          ))}
        </div>
        {error && <Message mode="error" message={errorMessage} />}
      </div>
      {editInput}
    </div>
  );
}

export default RatingInput;
