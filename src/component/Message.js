import React from "react";
import SVGIcon from "./SVGIcon";
import { INITIAL } from "../utils/constant";

const MESSAGE_MODE = {
  ERROR: "error",
  SUCCESS: "success",
  INFO: "info",
};

function Message({ mode = "info", message }) {
  return (
    <div className={`helpertext ${mode}-text message-wrapper`}>
      {mode === MESSAGE_MODE.ERROR && (
        <SVGIcon icon="error" height="1em" width="1em" />
      )}
      {message || INITIAL[`${mode.toUpperCase()}_MESSAGE`]}
    </div>
  );
}

export default Message;
