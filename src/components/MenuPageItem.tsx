import { ReactNode } from "react";

interface Props {
  color?: string;
  children: ReactNode;
  onClick: () => void;
}

const MenuPageItem = ({ color, children, onClick }: Props) => {
  return (
    <div
      className="flex-grow transition-transform duration-300 ease-[cubic-bezier(.37,.01,.23,1.8)] hover:translate-x-6"
      onClick={onClick}
    >
      <h1
        className={`${color} relative top-1/2 -translate-y-1/2 font-stretch text-6xl h-full flex flex-col justify-center`}
      >
        {children}
      </h1>
    </div>
  );
};

MenuPageItem.defaultProps = {
  color: "text-inherit",
  onClick: () => {},
};

export default MenuPageItem;
