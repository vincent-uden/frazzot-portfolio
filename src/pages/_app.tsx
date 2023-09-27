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

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.browser) return ""; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/trpc` : `http://localhost:3000/api/trpc`;
    const cookies = new Cookies();

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      headers() {
        if (ctx?.req) {
          const {
            connection: _connection,
            ...headers
          } = ctx.req.headers;
          return {
            ...headers,
            'x-ssr': '1',
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
