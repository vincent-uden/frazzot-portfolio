import React, { useState } from "react";

interface Props {
  color?: string;
  text?: string;
  onClick?: React.MouseEventHandler;
  success: boolean;
}

const SubmitButton = ({ color, text, onClick, success }: Props) => {
  return (
    <div className="relative">
      <button
        className={`block bg-${color} font-stretch text-2xl text-greyblack py-4 border-2 border-${color} hover:bg-greyblack hover:text-${color} transition-colors w-full px-8 angry-shake`}
        id="submitBtn"
        onClick={onClick}
      >
        {text}
      </button>
      {
        success ? (
          <svg className={`absolute checkmark h-full top-0 left-full`} viewBox="0 0 52 52">
            <path
              className={`checkmark__check stroke-${color} stroke-2`}
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        ) : <></>
      }
    </div>
  );
};

SubmitButton.defaultProps = {
  color: "white",
  text: "SUBMIT",
  onClick: (_: React.MouseEvent) => {},
  success: false,
};

export default SubmitButton;
