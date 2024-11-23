import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Top = () => {
  const navigate = useNavigate();
  const onTop = () => {
    navigate("/");
  };
  return (
    <div className="fixed bottom-5 right-5">
      <button
        onClick={onTop}
        className="bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition duration-200"
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
    </div>
  );
};

export default Top;
