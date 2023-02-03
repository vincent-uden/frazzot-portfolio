import Link from "next/link";

export const BlogPost = ({ content, data }: any) => {
  return (
    <div className="min-h-screen w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1920px_330px] bg-repeat-x">
      <p className="mt-64 text-center font-stretch text-3xl text-sky md:text-4xl lg:text-6xl">
        BLOG
      </p>
      <p className="bg-holo text-center font-stretch text-xs text-greyblack md:text-2xl lg:text-3xl">
        PROJECT ARCHIVE AND POSTS_
      </p>
      <div className="blog-post relative mx-auto mt-8 max-w-[920px] border-[16px] border-sky bg-pattern-holo-short-inv bg-contain bg-no-repeat">
        <h1 className="text-holo absolute top-0 -left-16 w-fit origin-top-right -translate-x-full rotate-[270deg] font-stretch text-4xl">
          {data.title.toUpperCase()}
        </h1>
        <div className="date-header mt-8 flex w-full flex-row px-8">
          <p className="grow">{data.date}</p>
          <p className="">{data.time}</p>
        </div>
        <div className="p-8">{content}</div>
      </div>

      <div className="h-8" />
      <div className="mx-auto max-w-[920px]">
        <Link href="/blog">
          <a className="float-right inline-block bg-holo bg-[length:600px_600px] py-6 px-28 font-stretch text-xl text-greyblack">
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
