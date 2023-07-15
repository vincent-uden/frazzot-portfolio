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
        className={`block bg-${color} border-2 py-4 font-stretch text-xl text-greyblack md:text-2xl border-${color} hover:bg-greyblack hover:text-${color} angry-shake w-full px-8 transition-colors`}
        id="submitBtn"
        onClick={onClick}
      >
        {text}
      </button>
      {success ? (
        <svg
          className={`checkmark absolute left-1/2 -translate-x-1/2 md:top-0 md:left-full md:translate-x-0 h-full`}
          viewBox="0 0 52 52"
        >
          <path
            className={`checkmark__check stroke-${color} stroke-2`}
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      ) : (
        <></>
      )}
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
