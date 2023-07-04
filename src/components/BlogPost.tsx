import Link from "next/link";

export const BlogPost = ({ content, data }: any) => {
  return (
    <div className="blog-container min-h-screen w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1090px_220px] bg-[center_top_4rem] bg-repeat-x md:bg-[length:1920px_330px]">
      <div className="h-48 md:h-64" />
      <p className="text-center font-stretch text-3xl text-sky md:text-4xl lg:text-6xl">
        BLOG
      </p>
      <div className="mt-2 mb-16 bg-holo bg-cover py-2 md:mt-8">
        <p className="page-sub-header no-ligature">ARCHIVE AND POSTS_</p>
      </div>
      <div className="blog-post relative mx-auto mt-8 max-w-[920px] border-sky bg-contain bg-no-repeat lg:border-[16px] lg:bg-pattern-holo-short-inv">
        <h1 className="text-holo absolute top-0 -left-16 hidden w-max origin-top-right -translate-x-full rotate-[270deg] font-stretch text-4xl lg:block">
          {data.title.toUpperCase()}
        </h1>
        <div className="mb-8 pt-2 pb-8 shadow-blog-panel lg:mb-0 lg:pb-0 lg:shadow-none">
          <div className="date-header mt-8 flex w-full flex-row px-8">
            <p className="grow">{data.date}</p>
            <p className="">{data.time}</p>
          </div>
          <h1 className="text-holo no-ligature px-8 text-center font-stretch text-xl md:text-left md:text-2xl lg:hidden">
            {data.title.toUpperCase()}
          </h1>
        </div>
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
    <div className="flex flex-row gap-4 quote mb-4 bg-periwinkle bg-opacity-10">
      <div className="w-2 bg-periwinkle"/>
      <div className="grow italic">
        {children}
      </div>
    </div>
  )
}