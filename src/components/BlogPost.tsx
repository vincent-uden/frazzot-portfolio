import Link from "next/link";

export const BlogPost = ({ content, data }: any) => {
  return (
    <div className="blog-container min-h-screen w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1090px_220px] bg-[center_top_4rem] bg-repeat-x md:bg-[length:1920px_330px]">
      <div className="h-48 md:h-64" />
      {/*
      <p className="text-center font-stretch text-3xl text-sky md:text-4xl lg:text-6xl">
        BLOG
      </p>
      <div className="mt-2 mb-16 bg-holo bg-cover py-2 md:mt-8">
        <p className="page-sub-header no-ligature">ARCHIVE AND POSTS_</p>
      </div>
      */}
      <div className="pt-2 pb-8 shadow-blog-panel">
        <div className="mx-auto max-w-[920px] px-8">
          <div className="date-header mt-8 ">
            <div className="mx-auto flex max-w-[920px] flex-row justify-between">
              <p className="grow">{data.date}</p>
              <p className="">{data.time}</p>
            </div>
          </div>
        </div>
        <h1 className="text-holo no-ligature mx-auto mt-2 max-w-[920px] px-8 text-center font-stretch text-xl md:text-left md:text-2xl">
          {data.title.toUpperCase()}
        </h1>
      </div>
      <div className="blog-post relative mx-auto max-w-[920px]">
        <div className="blog-content p-8">{content}</div>
      </div>

      <div className="h-8" />
      <div className="mx-auto grid max-w-[920px] justify-center px-32 md:block lg:px-0">
        <Link href="/blog">
          <a className="inline-block w-full bg-holo bg-[length:800px_600px] py-6 px-28 text-center font-stretch text-xl text-greyblack md:text-2xl lg:float-right lg:w-fit">
            BACK
          </a>
        </Link>
      </div>
      <div className="h-[330px] w-screen overflow-y-hidden bg-pattern-holo-short bg-[length:1920px_330px] bg-repeat-x" />
    </div>
  );
};

export const RightStack = ({ children, masterWidth }: any) => {
  return (
    <div className="split-stack">
      <aside className="grow-0" style={{ flexBasis: masterWidth ?? "50%" }}>
        {children.slice(0, 1)}
      </aside>
      <aside className="grow">{children.slice(1)}</aside>
    </div>
  );
};

export const LeftStack = ({ children, masterWidth }: any) => {
  return (
    <div className="split-stack">
      <aside className="grow">{children.slice(1)}</aside>
      <aside className="grow-0" style={{ flexBasis: masterWidth ?? "50%" }}>
        {children.slice(0, 1)}
      </aside>
    </div>
  );
};

export const QuoteBlock = ({ children }: any) => {
  return (
    <div className="quote mb-5 grid grid-cols-[4px_1fr] gap-4 bg-periwinkle bg-opacity-10">
      <div className="bg-periwinkle" />
      <div className="my-2 italic">{children}</div>
    </div>
  );
};
