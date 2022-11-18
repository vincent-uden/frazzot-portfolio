import { useEffect, useRef, useState } from "react";

import Image from "next/image";

const Projects = () => {
  const [openAcc, setOpenAcc] = useState<boolean[]>([]);
  const [accHeights, setAccHeights] = useState<number[]>([]);
  const [firstRenderComplete, setFirstRenderComplete] =
    useState<boolean>(false);
  const accordionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(getHeights, 600);
  }, [accordionRef]);

  const getHeights = () => {
    const container = accordionRef.current;
    if (container != null) {
      setFirstRenderComplete(false);
      const heights = [];
      const opens = [];

      for (let i = 0; i < container.childElementCount; i++) {
        heights.push(container.children[i]!!.children[1]!!.clientHeight);
        opens.push(false);
      }
      setAccHeights(heights);
      setOpenAcc(opens);

      setFirstRenderComplete(true);
    }
  };

  return (
    <>
      <div className="w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1920px_330px] bg-repeat-x">
        <div className="h-64"></div>
        <h1 className="pl-4 text-center font-stretch text-6xl text-periwinkle">
          PROJECTS
        </h1>
        <div className="mt-8 mb-16 bg-holo bg-cover py-2">
          <h2 className="text-center font-stretch text-3xl text-greyblack">
            OTHER CREATIVE PROJECTS_
          </h2>
        </div>
      </div>
      <div className="flex flex-row justify-center max-w-screen-xl mx-auto">
        <div className="flex grow flex-row">
          <div className="mr-24 grow">
            <div className="inline-block w-full bg-holo p-[2px]">
              <div className="bg-greyblack p-12">
                <h2 className="no-ligature font-stretch text-2xl text-sky">
                  MORE THAN JUST ART &gt;
                </h2>
                <p className="pt-4 font-cocogoose text-lg font-thin text-sky">
                  THIS PAGE IS DEDICATED TO ALL MY SMALL PROJECTS THAT DON'T
                  QUITE MAKE THE CUT FOR THE MAIN CAST, BUT STILL PLAY A GREAT
                  ROLE IN MY CREATIVE LIFESTYLE.
                </p>
                <p className="pt-4 font-cocogoose text-lg font-thin text-sky">
                  FEEL FREE TO BROWSE IT ALL FROM THIS PAGE!
                </p>
              </div>
            </div>
            <div className="mt-12 inline-block w-full bg-holo bg-left bg-auto p-8">
              <div className="float-left inline-block w-2/5">
                <img
                  src="/img/sgs.png"
                  alt="Saradomin Godsword"
                  className="inline h-full w-full"
                />
              </div>
              <div className="float-right inline-block w-3/5 pl-24 pr-24 pt-4">
                <p className="pb-4 font-cocogoose text-xl font-extralight text-greyblack">
                  &gt; WIREFRAME MODEL OF THE SARADOMIN GODSWORD FROM RUNESCAPE.
                </p>
                <p className="pb-4 font-cocogoose text-xl font-extralight text-greyblack">
                  MODELED IN BLENDER AND TEXTURED IN SUBSTANCE PAINTER.
                </p>
                <p className="pb-4 font-cocogoose text-xl font-extralight text-greyblack">
                  YOU CAN FIND MORE IMAGES AND VIDEO FROM THE POST ON MY{" "}
                  <span>ARTSTATION</span>. THERE YOU WILL ALSO FIND MY OTHER
                  MODELLING PROJECTS.
                </p>
              </div>
            </div>
          </div>
          <div
            className="min-w-min flex-grow-0"
            ref={accordionRef}
            onMouseLeave={(e) => {
              const openSections = [...openAcc];
              for (let i = 0; i < openSections.length; i++) {
                openSections[i] = false;
              }
              setOpenAcc(openSections);
            }}
          >
            {[
              {
                header: "THE SIMS 4 MODS",
                body: "A COLLECTION OF MODS AND CUSTOM CONTENT CREATED FOR THE SIMS 4.",
                color: "sky",
              },
              {
                header: "GRAPHICS DESIGN",
                body: "STYLE GUIDES AND DESIGN SHEETS FOR SOME OF MY DESIGN PROJECTS.",
                color: "mint",
              },
              {
                header: "EGROUKORA",
                body: "A WORLDBUILDING PROJECT WITH THE AMBITION OF BECOMING A COMIC, YOU CAN READ MORE ABOUT THE CHARACTERS, WORLD AND STORY HERE.",
                color: "yellowpeach",
              },
              {
                header: "PAINTED FABRICS",
                body: "PAINTED BAGS, JEANS, AND JACKETS FOR FUN OR BY COMMISSION. HAVE A LOOK AT SOME EXAMPLES HERE.",
                color: "pastelpink",
              },
            ].map(({ header, body, color }, i) => {
              return (
                <div
                  className={`mb-4 border-2 transition-colors border-${color} bg-${
                    openAcc[i] ? "greyblack" : color
                  } py-8 px-16`}
                  key={`acc${i}`}
                  onMouseEnter={(e) => {
                    const openSections = [...openAcc];
                    for (let j = 0; j < openSections.length; j++) {
                      openSections[j] = i === j;
                    }
                    setOpenAcc(openSections);
                  }}
                  onMouseLeave={(e) => {
                    const openSections = [...openAcc];
                    openSections[i] = false;
                    setOpenAcc(openSections);
                  }}
                >
                  <h3
                    className={`no-ligatures whitespace-nowrap text-center font-stretch text-xl text-${
                      openAcc[i] ? color : "greyblack"
                    }`}
                  >
                    {header}
                  </h3>
                  <div
                    className={"overflow-hidden transition-all"}
                    style={
                      firstRenderComplete
                        ? {
                            maxHeight: `${openAcc[i] ? accHeights[i] : 0}px`,
                            opacity: openAcc[i] ? 100 : 0,
                          }
                        : {}
                    }
                  >
                    <p
                      className={`text-${
                        openAcc[i] ? color : "greyblack"
                      } pt-8 text-center font-cocogoose text-lg font-thin`}
                    >
                      {body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="h-32"></div>
      <div className="hidden border-mint border-sky border-yellowpeach border-pastelpink bg-mint bg-sky bg-yellowpeach bg-pastelpink text-mint text-sky text-yellowpeach text-pastelpink"></div>
    </>
  );
};

export default Projects;
