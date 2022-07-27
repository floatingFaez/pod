import { useEffect } from "react";
import Router from 'next/router';
import NProgress from "nprogress";
import { ThemeProvider } from "next-themes";
// import Loader from "@components/ui/loader";
import "../css/tailwind.css";


function MyApp({ Component, pageProps }) {

  NProgress.configure({
    showSpinner: true,
    template: `<div class="page-loader h-screen w-full theme-bg-black"><div class="bar" role="bar"><div class="peg"></div></div><div class="logo"><img src="/img/footer-logo.svg" width="115" height="115"/><p class="font-secondary mt-8 uppercase text-center fss-2 text-white">Loading...</p></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>`
  });


  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());

    return () => {
      Router.events.off("routeChangeStart", () => NProgress.start());
      Router.events.off("routeChangeComplete", () => NProgress.done());
      Router.events.off("routeChangeError", () => NProgress.done());
    }
  }, [])

  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
