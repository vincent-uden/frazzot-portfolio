const BlogPost = ({ content, data }: any) => {
  return (
    <div className="min-h-screen w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1920px_330px] bg-repeat-x">
      <p className="mt-64 text-center font-stretch text-3xl text-sky md:text-4xl lg:text-6xl">
        BLOG
      </p>
      <p className="bg-holo text-center font-stretch text-xs text-greyblack md:text-2xl lg:text-3xl">
        PROJECT ARCHIVE AND POSTS_
      </p>
      <div className="blog-post relative mx-auto mt-8 max-w-screen-lg border-8 border-sky bg-pattern-holo-short-inv bg-contain bg-no-repeat">
        <h1 className="font-stretch text-4xl text-holo absolute top-0 -left-16 w-fit origin-top-right -translate-x-full rotate-[270deg]">
          {data.title.toUpperCase()}
        </h1>
        <div className="flex w-full flex-row px-8 mt-8 date-header">
          <p className="grow">{data.date}</p>
          <p className="">{data.time}</p>
        </div>
        <div className="p-8">
          {content}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
