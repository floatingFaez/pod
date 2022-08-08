import { useEffect, useState } from "react";
import Router from 'next/router';
import NProgress from "nprogress";
import { ThemeProvider } from "next-themes";
import { randomBetween, clamp } from "@utils/all";
import "../css/tailwind.css";



function MyApp({ Component, pageProps }) {
  const [count, setCount] = useState(0)
  const [seconds, setSeconds] = useState(0)

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
        if(percentage < 101){
          setCount(percentage)
        }
        if(!!document && document.getElementById('percentage') && percentage < 101){
          document.getElementById('percentage').textContent = percentage.toFixed(0)
        }
        work();
      }, 200);
    };
    if (NProgress.trickle) work();
    return this;
  }
  
  NProgress.configure({
    showSpinner: false,
    template: `<div class="page-loader h-screen w-full theme-bg-black"><div class="bar" role="bar"><div class="peg"></div></div><div class="logo"><img src="/img/footer-logo.svg" width="115" height="115" class="animate-[spin_6s_linear_infinite]"/><p class="font-secondary mt-8 uppercase text-center fss-2 text-white">Loading <span id='percentage'>${count.toFixed(0)}</span>%</p></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>`
  });

  useEffect(()=>{
    NProgress.start()
    startCount()
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 800);

    if(seconds === 2){
      clearInterval(interval)
      if(!!document && !!document.getElementById('percentage')){
        document.getElementById('percentage').textContent = randomBetween(96,100).toFixed(0)
      }
      setTimeout(()=>{
        NProgress.done()
      },500)
    }

    return () => {
      clearInterval(interval)
    }
  },[seconds])


  useEffect(() => {
    Router.events.on("routeChangeStart", () =>{
      startCount()
      NProgress.start()
    });
    Router.events.on("routeChangeComplete", () => {
      if(!!document && !!document.getElementById('percentage')){
        document.getElementById('percentage').textContent = randomBetween(96,100)
      }
      setTimeout(()=>{
        NProgress.done()
      },500)
    });
    Router.events.on("routeChangeError", () => {
      if(!!document && !!document.getElementById('percentage')){
        document.getElementById('percentage').textContent = randomBetween(96,100)
      }
      setTimeout(()=>{
        NProgress.done()
      },500)
    });

    return () => {
      Router.events.off("routeChangeStart", () =>{
        NProgress.start()
        startCount()
      });
      Router.events.off("routeChangeComplete", () => {
        if(!!document && !!document.getElementById('percentage')){
          document.getElementById('percentage').textContent = randomBetween(96,100)
        }
        setTimeout(()=>{
          NProgress.done()
        },500)
      });
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
