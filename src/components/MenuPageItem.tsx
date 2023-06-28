import { ReactNode } from "react";

interface Props {
  color?: string;
  children: ReactNode;
  onClick: () => void;
}

const MenuPageItem = ({ color, children, onClick }: Props) => {
  return (
    <div
      className="transition-transform duration-300 ease-[cubic-bezier(.37,.01,.23,1.8)] hover:translate-x-6 lg:flex-grow"
      onClick={onClick}
    >
      <h1
        className={`${color} relative top-1/2 mb-4 flex h-full -translate-y-1/2 flex-col justify-center pl-3 font-stretch text-2xl md:text-5xl 2xl:text-6xl`}
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
