
import { Fragment } from "react";
import dynamic from 'next/dynamic'
import { getClient } from "@lib/sanity";
import { configQuery, homeQuery, homeSliderQuery } from "@lib/groq";

import Layout from "@components/layout";
import Button from "@components/ui/button";
import Container from "@components/container";
import CTAItem from "@components/ui/cta-item";
import SliderPlaceHolder from "@components/ui/slider-placeholder";
const Slider = dynamic(() => import('@components/sections/slider'),{ loading: () => <SliderPlaceHolder sizes={{w:1440,h:1052}}/>, ssr: false });

export default function Home(props) {
  const { page,sliders,siteconfig } = props;

  const ctaObj = {title:page.cta_title,subtitle:page.cta_subtitle,body:page.body,mainImage:page.ctaImage}
  return (
    <Layout {...siteconfig}>
      {!!page && 
        <Fragment>
          <Container className="full-width">
            <Slider {...{items:sliders,sizes:{w:1440,h:1052},classes:"-mt-14"}} />
          </Container>
          <Container className="full-width border-t">
            <CTAItem item={ctaObj} imgSizes={{w:700,h:980}} classes="max-w-screen-xl mx-auto  px-8 xl:px-5">
              <Button text="Book Your Call" />
            </CTAItem>
          </Container>
        </Fragment>
      }
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const config = await getClient(preview).fetch(configQuery);
  const homeData = await getClient(preview).fetch(homeQuery);
  const homeSliders = await getClient(preview).fetch(homeSliderQuery);
  return {
    props: {
      page: homeData,
      sliders: homeSliders,
      siteconfig: { ...config },
      preview
    },
    revalidate: 100
  };
}
