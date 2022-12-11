import { ReactNode } from "react";

interface Props {
  color?: string;
  children: ReactNode;
  onClick: () => void;
}

const MenuPageItem = ({ color, children, onClick }: Props) => {
  return (
    <div
      className="md:flex-grow transition-transform duration-300 ease-[cubic-bezier(.37,.01,.23,1.8)] hover:translate-x-6"
      onClick={onClick}
    >
      <h1
        className={`${color} relative top-1/2 flex h-full -translate-y-1/2 flex-col justify-center font-stretch text-2xl md:text-6xl mb-4 pl-3`}
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
