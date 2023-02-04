import Head from "next/head";
import React, { useEffect, useState } from "react";

import { promises as fs } from "fs";
import path from "path";
import { GetStaticProps } from "next";
import Link from "next/link";

//import Content, {data} from "./blog_posts/test_blog.mdx";
//console.log(data);

type Post = {
  title: String;
  author: String;
  date: String;
  time: String;
  fileName: String;
};

type Props = {
  posts: Post[];
};

const Blog = ({ posts }: Props) => {
  const [postComponents, setPostComponents] = useState<React.ReactElement[]>(
    []
  );

  useEffect(() => {
    importPosts();
  }, []);

  const importPosts = async () => {
    const output = [];
    for (const p of posts) {
      output.push((await import(`./blog_posts/${p.fileName}`)).default());
    }

    setPostComponents(output);
  };

  return (
    <>
      <Head>
        <title>FRAZZOT - Blog</title>
        <meta name="description" content="Portfolio of Frazzot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1920px_330px] bg-repeat-x">
        <div className="h-64"></div>
        <h1 className="pl-4 text-center font-stretch text-6xl text-sky">
          BLOG
        </h1>
        <div className="mt-8 mb-16 bg-holo bg-cover py-2">
          <h2 className="text-center font-stretch text-3xl text-greyblack">
            PROJECT ARCHIVE AND POSTS_
          </h2>
        </div>
      </div>

      <div className="blog-previews">
      {postComponents.map((comp, i) => {
        return (
          <Link href={`/blog_posts/${posts[i]?.fileName.split(".")[0] ?? ""}`}>
            <a>
              {comp}
            </a>
          </Link>
        );
      })}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const postsDir = path.join(process.cwd(), "src/pages/blog_posts");
  const filenames = await fs.readdir(postsDir);

  const posts: Post[] = [];

  for (const f of filenames) {
    const mod = await import("./blog_posts/" + f);
    posts.push({ ...mod.data, fileName: f });
  }

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
