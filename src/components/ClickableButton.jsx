import React, { useState } from "react";

function ClickableButton({ text, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const gradient = isHovered
    ? "bg-gradient-to-br from-green-400 to-blue-500"
    : "bg-gradient-to-br from-purple-400 to-blue-500";

  return (
    <button
      className={`text-base sm:text-lg md:text-xl lg:text-2xl m-4 flex items-center py-2 px-4 rounded-full text-white shadow-lg focus:outline-none transition duration-300 ${gradient}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="ml-2 bi bi-caret-down-fill"
        viewBox="0 0 16 16"
      >
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
      </svg>
    </button>
  );
}

export default ClickableButton;
