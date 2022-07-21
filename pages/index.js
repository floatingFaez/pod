
import { Fragment } from "react";
import dynamic from 'next/dynamic'
import { getClient } from "@lib/sanity";
import { configQuery, homeQuery, homeSliderQuery, eventQuery, workQuery } from "@lib/groq";

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
const WorkSlider = dynamic(() => import('@components/workSlider'),{ loading: () => <SliderPlaceHolder sizes={{w:480,h:678}}/>, ssr: false });
const Slider = dynamic(() => import('@components/sections/slider'),{ loading: () => <SliderPlaceHolder sizes={{w:1440,h:1052}}/>, ssr: false });

export default function Home(props) {
  const { page,sliders, events, works, siteconfig } = props;
  const [navBg,setNavBg] = useState('bg-transparent')
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [modalShow,setModalShow] = useState(false)
  const [showBooking,setShowBooking] = useState(false)

  useEffect(() => {
    const onScroll = e => {
      let pageOffset = e.target.documentElement.scrollTop
      setScrollTop(pageOffset);
      setScrolling(pageOffset > scrollTop);
      if(pageOffset > 100){
        setNavBg('bg-gray-900')
      }else{
        setNavBg('bg-transparent')
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
            <Slider {...{items:sliders,sizes:{w:1440,h:1052},classes:"-mt-14"}} />
            <Marquee text="(POD)® FLIGHTS SOON DEPARTING" count={10} />
          </Container>
          
          <EventList events={events} setModalShow={setModalShow}/>

          <Container className="full-width border-t">
            <CTAItem item={ctaObj} imgSizes={{w:700,h:980}} classes="max-w-screen-xl mx-auto  px-0">
              <Button text="Book Your Call" classes="border border-white py-4 px-20 hover:bg-gray-700" handleClick={() => setShowBooking(true)}/>
            </CTAItem>
          </Container>

          <HeaderSection title="Adventure Awaits" subtitle="RECENT WORK" classes="border-y theme-gray-bg txt-black border-black"/>
          <WorkSlider works={works} sliderPerView={3} />
          <When condition={modalShow}>
            <SubscriptionModal setModalShow={setModalShow} classes="tape"/>
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
  const workData = await getClient(preview).fetch(workQuery);
  const homeSliders = await getClient(preview).fetch(homeSliderQuery);
  const events = await getClient(preview).fetch(eventQuery);
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
