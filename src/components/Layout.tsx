import { ReactNode, useCallback, useRef, useState } from "react";

import MenuPageItem from "./MenuPageItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArtstation,
  faYoutube,
  faPatreon,
  faFacebook,
  faInstagram,
  faDeviantart,
} from "@fortawesome/free-brands-svg-icons";
import { Squeeze as Hamburger } from "hamburger-react";
import Link from "next/link";
import {
  ArtstationIcon,
  DeviantartIcon,
  FacebookIcon,
  InstagramIcon,
  PatreonIcon,
  YoutubeIcon,
} from "./SocialIcons";

interface Props {
  children: ReactNode;
}

// TODO: Fix menu toggle transition and js functionality
const Layout = ({ children }: Props) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [greyMenuOpen, setGreyMenuOpen] = useState<boolean>(false);

  const menuOnClick = useCallback(async () => {
    if (menuOpen) {
      setGreyMenuOpen(!greyMenuOpen);
      await new Promise((resolve) => setTimeout(resolve, 200));
      setMenuOpen(!menuOpen);
    } else {
      setMenuOpen(!menuOpen);
      await new Promise((resolve) => setTimeout(resolve, 200));
      setGreyMenuOpen(!greyMenuOpen);
    }
  }, [menuOpen, greyMenuOpen, setGreyMenuOpen, setMenuOpen]);

  return (
    <>
      <div className="main m-0 flex min-h-screen flex-col justify-around p-0 ">
        <div className="flex-grow justify-center bg-greyblack">
          <div className="z-10 flex flex-col justify-between overflow-x-hidden overflow-y-hidden">
            {children}
          </div>
        </div>
      </div>
      <div className="bg-holo bg-cover">
        <div className="h-24"></div>
        <div className="menu-socials flex flex-row justify-center">
          <InstagramIcon color="greyblack" size="10" />
          <YoutubeIcon color="greyblack" size="10" />
          <PatreonIcon color="greyblack" size="10" />
          <ArtstationIcon color="greyblack" size="10" />
          <FacebookIcon color="greyblack" size="10" />
          <DeviantartIcon color="greyblack" size="10" />
        </div>

        <div className="h-8"></div>
        <p className="text-center font-cocogoose text-xl font-thin text-greyblack">
          © 2022 FRAZZOT
        </p>
        <div className="h-16"></div>
      </div>

      <Link href="/">
        <a>
          <h1
            className={`fixed top-0 left-4 z-40 h-16 align-middle font-stretch text-4xl leading-[4rem] text-greyblack ${
              menuOpen ? "opacity-0" : "opacity-100"
            } transition-opacity`}
          >
            FRAZZOT
          </h1>
        </a>
      </Link>
      <Hamburger
        onToggle={() => menuOnClick()}
        color="#292a2c"
        toggled={menuOpen}
      />
      <div
        className={`fixed top-0 left-0 z-30 h-screen w-screen bg-holo bg-cover shadow-lg ${
          menuOpen ? "" : "-translate-y-[calc(100vh-4rem)]"
        } transition-transform duration-[400ms] ease-in-out`}
      ></div>
      <div
        className={`fixed top-48 md:top-2 left-4 right-4 bottom-4 md:right-48 bg-greyblack ${
          greyMenuOpen ? "" : "-translate-y-[calc(100vh+10rem)]"
        } z-40 transition-transform duration-[400ms]`}
      >
        <div className="flex h-full flex-col justify-between p-4 md:p-20">
          <MenuPageItem color="text-mint" onClick={() => menuOnClick()}>
            <Link href="/gallery">
              <a className="no-ligature flex h-full flex-col justify-center">
                GALLERY
              </a>
            </Link>
          </MenuPageItem>
          <MenuPageItem color="text-sky" onClick={() => menuOnClick()}>
            <Link href="/projects">
              <a className="no-ligature flex h-full flex-col justify-center">
                PROJECTS
              </a>
            </Link>
          </MenuPageItem>
          <MenuPageItem color="text-periwinkle" onClick={() => menuOnClick()}>
            <Link href="/commissions">
              <a className="flex h-full flex-row items-center justify-start">
                <span className="no-ligature h-fit">COMM</span>
                <span className="h-fit">ISSIONS</span>
              </a>
            </Link>
          </MenuPageItem>
          <MenuPageItem color="text-lilac" onClick={() => menuOnClick()}>
            <Link href="/about">
              <a className="no-ligature flex h-full flex-col justify-center">
                ABOUT
              </a>
            </Link>
          </MenuPageItem>
          <MenuPageItem color="text-pastelpink" onClick={() => menuOnClick()}>
            <Link href="/contact">
              <a className="no-ligature flex h-full flex-col justify-center">
                CONTACT
              </a>
            </Link>
          </MenuPageItem>
          <MenuPageItem color="text-yellowpeach" onClick={() => menuOnClick()}>
            <Link href="/sketchbook">
              <a className="flex h-full flex-col justify-center">
                SKETCHBOOK
              </a>
            </Link>
          </MenuPageItem>

          <div className="menu-socials mb:mt-20 mb-4 flex flex-row grow justify-around md:justify-start items-end">
            <InstagramIcon color="fuchsia-200" size="8" />
            <YoutubeIcon color="fuchsia-200" size="8" />
            <PatreonIcon color="fuchsia-200" size="8" />
            <ArtstationIcon color="fuchsia-200" size="8" />
            <FacebookIcon color="fuchsia-200" size="8" />
            <DeviantartIcon color="fuchsia-200" size="8" />
          </div>
          <div className="hidden h-10 w-10 text-fuchsia-200"></div>
        </div>
      </div>
    </>
  );
};

export default Layout;
