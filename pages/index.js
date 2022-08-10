
import { Fragment } from "react";
import dynamic from 'next/dynamic'
import { groq } from "next-sanity";
import { getClient } from "@lib/sanity";
import { configQuery, homeQuery, homeSliderQuery } from "@lib/groq";

import {useState, useEffect} from 'react'
import Layout from "@components/layout";
import Button from "@components/ui/button";
import Marquee from "@components/ui/marquee";
import When from "@components/when";
import Container from "@components/container";
import EventList from "@components/eventlist";
import CTAItem from "@components/ui/cta-item";
import HeaderSection from "@components/sections/headerSection";
import SubscriptionModal from "@components/modal/subscriptionModal";
import BookingModal from "@components/modal/bookingModal";
import SliderPlaceHolder from "@components/ui/slider-placeholder";
const WorksSlider = dynamic(() => import('@components/worksSlider'),{ loading: () => <SliderPlaceHolder sizes={{w:480,h:678}}/>, ssr: false });
const Slider = dynamic(() => import('@components/sections/slider'),{ loading: () => <SliderPlaceHolder sizes={{w:1440,h:1052}}/>, ssr: false });

export default function Home(props) {
  const { page,sliders, events, works, siteconfig } = props;
  const [navBg,setNavBg] = useState('theme-bg-black md:bg-transparent')
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [modalShow,setModalShow] = useState(false)
  const [showBooking,setShowBooking] = useState(false)

  const {footerlogo,marquee_text,marquee_speed,marquee_tape_text} = siteconfig

  useEffect(() => {
    const onScroll = e => {
      let pageOffset = e.target.documentElement.scrollTop
      setScrollTop(pageOffset);
      setScrolling(pageOffset > scrollTop);
      if(pageOffset > 100){
        setNavBg('bg-gray-900')
      }else{
        setNavBg('theme-bg-black md:bg-transparent')
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);


  const ctaObj = {title:page.cta_title,subtitle:page.cta_subtitle,body:page.body,mainImage:page.ctaImage}
  return (
    <Layout {...siteconfig} navClass={navBg}>
      {!!page && 
        <Fragment>
          <Container className="full-width">
            <Slider {...{items:sliders,sizes:{w:1440,h:1052},logo:footerlogo,classes:"-mt-14"}} />
            <Marquee count={10} classes='banner-marquee' speed={marquee_speed}>
              {marquee_text}
            </Marquee>
          </Container>
          
          <EventList events={events} setModalShow={setModalShow}/>

          <Container className="full-width border-t" id="book-discover-call">
            <CTAItem item={ctaObj} imgSizes={{w:700,h:980}} classes="max-w-screen-xl mx-auto  px-0">
              <Button text="Book Your Call" classes="border border-white py-4 px-20 hover:bg-gray-700" handleClick={() => setShowBooking(true)}/>
            </CTAItem>
          </Container>

          <HeaderSection title={page.header_subtitle} subtitle={page.header_title} classes="border-y theme-gray-bg txt-black border-black"/>
          <WorksSlider works={works} sliderPerView={3} listLink={{name:page.work_text,link:page.work_link}}/>
          <When condition={modalShow}>
            <SubscriptionModal setModalShow={setModalShow} classes="tape" scrollText={marquee_tape_text} tickerSpeed={marquee_speed}/>
          </When>
          <When condition={showBooking}>
            <BookingModal setModalShow={setShowBooking} classes='!theme-gray-bg border border-black p-6'/>
          </When>
          
        </Fragment>
      }
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const config = await getClient(preview).fetch(configQuery);
  const homeData = await getClient(preview).fetch(homeQuery);
  const homeSliders = await getClient(preview).fetch(homeSliderQuery);

  const limit = homeData?.event_limit ? homeData?.event_limit : 4;
  const workLimit = homeData?.work_limit ? homeData?.work_limit : 4;

  const eventQuery = groq`
    *[_type == "events"] | order(startDate asc)[0..${limit - 1}] {...,}
  `;

  const workQuery = groq`
    *[_type == "work"] | order(_createdAt asc)[0..${workLimit - 1}] {...,}
  `;    

  const events = await getClient(preview).fetch(eventQuery);
  const workData = await getClient(preview).fetch(workQuery);

  return {
    props: {
      page: homeData,
      sliders: homeSliders,
      works: workData,
      events: events,
      siteconfig: { ...config },
      preview
    },
    revalidate: 100
  };
}
