import { useEffect, useState } from "react";
import Router from 'next/router';
import NProgress from "nprogress";
import { ThemeProvider } from "next-themes";
// import Loader from "@components/ui/loader";
import "../css/tailwind.css";

function clamp(n, min, max) {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}


function MyApp({ Component, pageProps }) {
  const [count, setCount] = useState(0)

  const startCount = function() {
    if (!NProgress.status) setCount(0);

    let n = 0;
    var work = function() {
      setTimeout(function() {
        if (!NProgress.status || NProgress.status * 10 > 0.95) return;
        let amount = Math.random() * 0.02
        if (typeof amount !== 'number') {
          amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
        }
        n = clamp(n + amount, 0, 0.994);
        let percentage = n * 1000
        setCount(percentage)
        if(!!document){
          document.getElementById('percentage').textContent = percentage.toFixed(1)
        }
        work();
      }, 200);
    };

    if (NProgress.trickle) work();

    return this;
  }
  
  NProgress.configure({
    showSpinner: false,
    template: `<div class="page-loader h-screen w-full theme-bg-black"><div class="bar" role="bar"><div class="peg"></div></div><div class="logo"><img src="/img/footer-logo.svg" width="115" height="115"/><p class="font-secondary mt-8 uppercase text-center fss-2 text-white">Loading <span id='percentage'>${count.toFixed(1)}</span>%</p></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>`
  });


  useEffect(() => {
    
    Router.events.on("routeChangeStart", () =>{
      startCount()
      NProgress.start()
    });
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());

    return () => {
      Router.events.off("routeChangeStart", () =>{
        NProgress.start()
        setCount(0)
      });
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
