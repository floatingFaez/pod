
import { Fragment } from "react";
import dynamic from 'next/dynamic'
import { getClient } from "@lib/sanity";
import { configQuery, homeQuery, homeSliderQuery, eventQuery, workQuery } from "@lib/groq";

import Layout from "@components/layout";
import Button from "@components/ui/button";
import Container from "@components/container";
import EventList from "@components/eventlist";
import CTAItem from "@components/ui/cta-item";
import Subpagehero from "@components/sections/subpagehero";
import SliderPlaceHolder from "@components/ui/slider-placeholder";
const WorkSlider = dynamic(() => import('@components/workSlider'),{ loading: () => <SliderPlaceHolder sizes={{w:480,h:678}}/>, ssr: false });
const Slider = dynamic(() => import('@components/sections/slider'),{ loading: () => <SliderPlaceHolder sizes={{w:1440,h:1052}}/>, ssr: false });

export default function Home(props) {
  const { page,sliders, events, works, siteconfig } = props;

  const ctaObj = {title:page.cta_title,subtitle:page.cta_subtitle,body:page.body,mainImage:page.ctaImage}
  return (
    <Layout {...siteconfig}>
      {!!page && 
        <Fragment>
          <Container className="full-width">
            <Slider {...{items:sliders,sizes:{w:1440,h:1052},classes:"-mt-14"}} />
          </Container>
          
          <EventList events={events} header={{title:'2022 CALENDAR',subtitle:'Upcoming Field Trips'}}/>

          <Container className="full-width border-t">
            <CTAItem item={ctaObj} imgSizes={{w:700,h:980}} classes="max-w-screen-xl mx-auto  px-8 xl:px-5">
              <Button text="Book Your Call" />
            </CTAItem>
          </Container>

          <Subpagehero title="Adventure Awaits" subtitle="RECENT WORK" classes="border-t"/>
          <WorkSlider works={works} sliderPerView={3} />

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
