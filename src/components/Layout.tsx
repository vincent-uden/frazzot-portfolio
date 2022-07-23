import { ReactNode, useCallback, useState } from "react";

import Header from "./Header";
import MenuPageItem from "./MenuPageItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArtstation, faYoutube, faPatreon, faFacebook, faInstagram, faDeviantart } from "@fortawesome/free-brands-svg-icons";
import { Squeeze as Hamburger } from "hamburger-react";
import Link from "next/link";

interface Props {
    children: ReactNode
}

// TODO: Fix menu toggle transition and js functionality
const Layout = ({children}: Props) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [greyMenuOpen, setGreyMenuOpen] = useState<boolean>(false);

  const menuOnClick = useCallback(async () => {
    if ( !menuOpen ) {
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
      <Header />
      <img className="fixed -z-5 top-1/4 -right-1/2 w-50 h-50" src="/gggyrate.svg" alt="" />
      <div className="flex-grow justify-center pt-6 bg-gray-900 px-28">
        <div className="container z-10 flex flex-col justify-between">
            { children }
        </div>
      </div>
      </div>
      <Hamburger onToggle={() => menuOnClick()}/>
      <div className={`fixed w-screen h-screen bg-holo bg-cover top-0 left-0 z-40 ${menuOpen ? "translate-y-[100vh]" : ""} transition-transform duration-[400ms] ease-in-out`}>
      </div>
      <div className={`fixed top-2 left-2 bottom-4 right-48 bg-greyblack ${greyMenuOpen ? "translate-y-[100vh]" : ""} transition-transform duration-[400ms] z-50`}>
        <div className="flex flex-col justify-between h-full p-20">
          <MenuPageItem color="text-mint">
            <Link href="/gallery">
              <a><span>GAL</span> <span className="relative -left-8">LERY</span></a>
            </Link>
          </MenuPageItem>
          <MenuPageItem color="text-sky">
            PROJECTS
          </MenuPageItem>
          <MenuPageItem color="text-periwinkle">
            <span>COM</span> <span className="relative -left-8">MISSIONS</span>
          </MenuPageItem>
          <MenuPageItem color="text-lilac">
            <Link href="/about">
              <a>ABOUT</a>
            </Link>
          </MenuPageItem>
          <MenuPageItem color="text-pastelpink">
            CONTACT
          </MenuPageItem>
          <MenuPageItem color="text-yellowpeach">
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
