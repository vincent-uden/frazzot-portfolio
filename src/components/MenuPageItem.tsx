import { ReactNode } from "react";

interface Props {
  color?: string;
  children: ReactNode;
  onClick: () => void;
}

const MenuPageItem = ({color, children, onClick}: Props) => {
  return (
    <div className="flex-grow hover:translate-x-6 transition-transform ease-[cubic-bezier(.37,.01,.23,1.8)] duration-300" onClick={onClick}>
      <h1 className={`${color} font-stretch text-6xl relative top-1/2 -translate-y-1/2`}>
        { children }
      </h1>
    </div>
  )
};

MenuPageItem.defaultProps = {
  color: "text-inherit",
  onClick: () => {},
}

export default MenuPageItem;
