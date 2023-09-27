// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import { splitLink } from "@trpc/client/links/splitLink";
import { httpLink } from "@trpc/client/links/httpLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import type { AppRouter } from "../server/router";
import superjson from "superjson";
import "../styles/globals.css";
import "../styles/markdown.css";
import "../styles/blog.css";
import Cookies from "universal-cookie";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import Layout from "../components/Layout";

import "../../public/fonts/style.css";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    if (typeof window !== "undefined") {
      return {
        transformer: superjson,
        url: "/api/trpc",
      };
    }

    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : (
      process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc` :
      `http://localhost:3000/api/trpc`
      );
    const cookies = new Cookies();

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      headers() {
        console.log("SSR?:");
        if (ctx?.req) {
          console.log("YES");
          const { connection: _connection, ...headers } = ctx.req.headers;
          return {
            "x-ssr": "1",
            ...headers,
          };
        }
        return {};
      },
      links: [
        splitLink({
          condition(op) {
            return op.context.skipBatch === true;
          },
          true: httpLink({
            url,
          }),
          false: httpBatchLink({
            url,
          }),
        }),
      ],
    };
  },
  ssr: true,
})(MyApp);
