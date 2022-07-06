
import { Fragment } from "react";
import dynamic from 'next/dynamic'
import Container from "@components/container";
import Layout from "@components/layout";
import SliderPlaceHolder from "@components/ui/slider-placeholder";
import { configQuery, homeQuery, homeSliderQuery } from "@lib/groq";
import { getClient } from "@lib/sanity";
const Slider = dynamic(() => import('@components/sections/slider'),{ loading: () => <SliderPlaceHolder sizes={{w:1440,h:1052}}/>, ssr: false });
import CTAItem from "@components/ui/cta-item";
import Button from "@components/ui/button";
import Newsletter from "@components/newsletter";

export default function Home(props) {
  const { page,sliders,siteconfig } = props;

  const ctaObj = {title:page.cta_title,subtitle:page.cta_subtitle,body:page.body,mainImage:page.ctaImage}
  return (
    <Layout {...siteconfig}>
      {!!page && 
        <Fragment>
          <Container py="0">
            <Slider {...{items:sliders,sizes:{w:1440,h:1052},classes:"-mt-14"}} />
            <CTAItem item={ctaObj} imgSizes={{w:700,h:980}} classes="border-y">
              <Button text="Book Your Call" />
            </CTAItem>
          </Container>
          <Newsletter siteconfig={siteconfig} classes="pt-0 border-t-0"/>
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
