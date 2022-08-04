import { ReactNode, useCallback, useRef, useState } from "react";

import MenuPageItem from "./MenuPageItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArtstation, faYoutube, faPatreon, faFacebook, faInstagram, faDeviantart } from "@fortawesome/free-brands-svg-icons";
import { Squeeze as Hamburger } from "hamburger-react";
import Link from "next/link";

interface Props {
  children: ReactNode
}

// TODO: Fix menu toggle transition and js functionality
const Layout = ({ children }: Props) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [greyMenuOpen, setGreyMenuOpen] = useState<boolean>(false);

  const menuOnClick = useCallback(async () => {
    if (menuOpen) {
      setGreyMenuOpen(!greyMenuOpen);
      await new Promise(resolve => setTimeout(resolve, 200));
      setMenuOpen(!menuOpen);
    } else {
      setMenuOpen(!menuOpen);
      await new Promise(resolve => setTimeout(resolve, 200));
      setGreyMenuOpen(!greyMenuOpen);
    }
  }, [menuOpen, greyMenuOpen, setGreyMenuOpen, setMenuOpen]);

  return (
    <>
      <div className="main flex flex-col justify-around m-0 p-0 min-h-screen ">
        <div className="flex-grow justify-center bg-greyblack">
          <div className="z-10 flex flex-col justify-between overflow-x-hidden overflow-y-hidden">
            {children}
          </div>
        </div>
      </div>
      <div className="bg-holo bg-cover">
        <div className="h-24"></div>
        <div className="flex flex-row menu-socials justify-center">
          <FontAwesomeIcon className="text-greyblack w-10 h-10 mx-4 cursor-pointer hover:scale-125 transition-transform" icon={faInstagram} />
          <FontAwesomeIcon className="text-greyblack w-10 h-10 mx-4 cursor-pointer hover:scale-125 transition-transform" icon={faYoutube} />
          <FontAwesomeIcon className="text-greyblack w-10 h-10 mx-4 cursor-pointer hover:scale-125 transition-transform" icon={faPatreon} />
          <FontAwesomeIcon className="text-greyblack w-10 h-10 mx-4 cursor-pointer hover:scale-125 transition-transform" icon={faArtstation} />
          <FontAwesomeIcon className="text-greyblack w-10 h-10 mx-4 cursor-pointer hover:scale-125 transition-transform" icon={faFacebook} />
          <FontAwesomeIcon className="text-greyblack w-10 h-10 mx-4 cursor-pointer hover:scale-125 transition-transform" icon={faDeviantart} />
        </div>

        <div className="h-8"></div>
        <p className="text-center text-greyblack font-cocogoose font-thin text-xl opacity-60">© 2022 FRAZZOT</p>
        <div className="h-16"></div>
      </div>

      <Link href="/">
        <a >
          <h1 className={`fixed top-0 left-4 h-16 align-middle font-stretch text-4xl text-greyblack leading-[4rem] z-50 ${menuOpen ? "opacity-0" : "opacity-100"} transition-opacity`}>FRAZZOT</h1>
        </a>
      </Link>
      <Hamburger onToggle={() => menuOnClick()} color="#292a2c" toggled={menuOpen} />
      <div className={`fixed w-screen h-screen bg-holo bg-cover top-0 left-0 z-40 shadow-lg ${menuOpen ? "" : "-translate-y-[calc(100vh-4rem)]"} transition-transform duration-[400ms] ease-in-out`}>
      </div>
      <div className={`fixed top-2 left-2 bottom-4 right-48 bg-greyblack ${greyMenuOpen ? "" : "-translate-y-[100vh]"} transition-transform duration-[400ms] z-50`}>
        <div className="flex flex-col justify-between h-full p-20">
          <MenuPageItem color="text-mint" onClick={() => menuOnClick()}>
            <Link href="/gallery">
              <a><span>GAL</span> <span className="relative -left-8">LERY</span></a>
            </Link>
          </MenuPageItem>
          <MenuPageItem color="text-sky" onClick={() => menuOnClick()}>
            PROJECTS
          </MenuPageItem>
          <MenuPageItem color="text-periwinkle" onClick={() => menuOnClick()}>
            <Link href="/commissions">
              <a href=""><span>COM</span> <span className="relative -left-8">MISSIONS</span></a>
            </Link>
          </MenuPageItem>
          <MenuPageItem color="text-lilac" onClick={() => menuOnClick()}>
            <Link href="/about">
              <a>ABOUT</a>
            </Link>
          </MenuPageItem>
          <MenuPageItem color="text-pastelpink" onClick={() => menuOnClick()}>
            <Link href="/contact">
              CONTACT
            </Link>
          </MenuPageItem>
          <MenuPageItem color="text-yellowpeach" onClick={() => menuOnClick()}>
            SKETCHBOOK
          </MenuPageItem>

          <div className="mt-20 flex flex-row menu-socials">
            <FontAwesomeIcon className="text-fuchsia-200 w-8 h-8 mx-4 hover:-translate-y-2 transition-transform" icon={faInstagram} />
            <FontAwesomeIcon className="text-fuchsia-200 w-8 h-8 mx-4 hover:-translate-y-2 transition-transform" icon={faYoutube} />
            <FontAwesomeIcon className="text-fuchsia-200 w-8 h-8 mx-4 hover:-translate-y-2 transition-transform" icon={faPatreon} />
            <FontAwesomeIcon className="text-fuchsia-200 w-8 h-8 mx-4 hover:-translate-y-2 transition-transform" icon={faArtstation} />
            <FontAwesomeIcon className="text-fuchsia-200 w-8 h-8 mx-4 hover:-translate-y-2 transition-transform" icon={faFacebook} />
            <FontAwesomeIcon className="text-fuchsia-200 w-8 h-8 mx-4 hover:-translate-y-2 transition-transform" icon={faDeviantart} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
