import { EmailError } from "../utils/errortypes";

interface Props {
  htmlFor?: string;
  color?: string;
  text?: string;
  marginTop?: string;
  height?: string;
  errorCodes: { code: EmailError; message: string }[];
  errors: EmailError[];
}

const InputLabel = ({
  htmlFor,
  color,
  text,
  marginTop,
  height,
  errorCodes,
  errors,
}: Props) => {
  let activeErrors = errors.map(
    (e) => errorCodes.find((ec) => ec.code == e)?.message || ""
  );
  return (
    <div className={`mt-${marginTop} h-${height}`}>
      <div className={`angry-shake`}>
        <label
          htmlFor={htmlFor}
          className={`label float-left ${color ? "text-" + color : ""}`}
        >
          {text}
        </label>
        <p
          className={`label float-right text-base opacity-70 ${
            color ? "text-" + color : ""
          }`}
        >
          {activeErrors.join("")}
        </p>
      </div>
    </div>
  );
};

InputLabel.defaultProps = {
  htmlFor: "",
  color: "",
  text: "",
  marginTop: "8",
  height: "fit",
  errorCodes: [],
  errors: [],
};

export default InputLabel;
