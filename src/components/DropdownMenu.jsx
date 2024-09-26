import React, { useRef, useEffect } from "react";
import { user_dumy } from "../assets";

export const DropdownMenu = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleCloseOutside = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <div className="dropdown-container">
      <div classname="dropdown-trigger">
        <img src={user_dumy} alt="profilePicture" className="user-picture" />
      </div>

      <div className></div>
    </div>
  );
};
