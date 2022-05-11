import "../styles/globals.css";
import { getSession, SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import React from "react";
import Layout, { BaseProps } from "@components/layout";
import { createPortal } from "react-dom";
import { NextPage } from "next";
import NavBar from "@components/NavBar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const ComponentFC = ({ user }: BaseProps) => {
    return <Component {...pageProps} user={user} />;
  };
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <SessionProvider session={session}>
        <NavBar></NavBar>
        <Layout FC={ComponentFC} />
      </SessionProvider>
    </SWRConfig>
  );
}
export default MyApp;
