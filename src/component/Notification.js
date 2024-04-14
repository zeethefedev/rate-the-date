import React, { useState } from "react";

const TIME_OUT = 10;
function Notification({ open, message }) {
  const [openNoti, setOpenNoti] = useState(open);

  const handleClose = () => {
    setOpenNoti(false);
  };

  return (
    <div>
      {openNoti && (
        <div>
          <div>{message}</div>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Notification;
