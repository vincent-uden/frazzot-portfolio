import { useEffect, useRef, useState } from "react";

const Projects = () => {
  const [openAcc, setOpenAcc] = useState<boolean[]>([]);
  const [accHeights, setAccHeights] = useState<number[]>([]);
  const [firstRenderComplete, setFirstRenderComplete] =
    useState<boolean>(false);
  const accordionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(getHeights, 200);
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
      <div
        className="mx-auto w-96"
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
              className={`my-4 border-2 transition-colors border-${color} bg-${
                openAcc[i] ? "greyblack" : color
              } p-8`}
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
                className={`no-ligatures text-center font-stretch text-xl text-${
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
                  } pt-8 text-center font-cocogoose font-thin`}
                >
                  {body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="hidden border-mint border-sky border-yellowpeach border-pastelpink bg-mint bg-sky bg-yellowpeach bg-pastelpink text-mint text-sky text-yellowpeach text-pastelpink"></div>
    </>
  );
};

export default Projects;
