import dynamic from 'next/dynamic'
import Container from "@components/container";
import Layout from "@components/layout";
import { configQuery, servicesQuery } from "@lib/groq";
import { getClient } from "@lib/sanity";
import GetImage from "@utils/getImage";
import SliderPlaceHolder from "@components/ui/slider-placeholder";
import Subpagehero from "@components/sections/subpagehero";
import Tabs from "@components/service/service-tabs";
const ItemSlider = dynamic(() => import('@components/ui/item-slider'),{ loading: () => <SliderPlaceHolder sizes={{w:310,h:88}}/>, ssr: false });
import Image from "next/image";
import Newsletter from "@components/newsletter";
import { PhotographIcon } from "@heroicons/react/outline";

export default function Services(props) {
  const { page, siteconfig, preview, preloadImage } = props;
  let imageProps = null

  if(!!page){
    imageProps = page?.mainImage ? GetImage(page.mainImage) : null;
  }
  

  return (
    <Layout {...siteconfig}>
      {!!page && 
        <>
        <Container py="0">
          <Subpagehero title={page.subtitle} subtitle={page.title}/>

          <div className="banner">
              {imageProps ? (
                <Image
                  src={imageProps.src}
                  loader={imageProps.loader}
                  blurDataURL={imageProps.blurDataURL}
                  alt={page.mainImage.alt || "Thumbnail"}
                  placeholder="blur"
                  layout="responsive"
                  width={'1440px'}
                  height={'660px'}
                  priority={preloadImage ? true : false}
                  className="transition-all"
                />
              ) : (
                <span className="absolute w-16 h-16 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <PhotographIcon />
                </span>
              )}

          </div>

          <div className="mx-auto prose text-center dark:prose-invert section-desc">
            <p className="text-desc text-3xl dark:text-white">
              {page.body}
            </p>
          </div>

          <Tabs tabs={page.tabs}/>

          <div className={`py-5 border-t border-gray-400 text-center`}>
              <p className="mt-2 text-lg text-white uppercase font-secondary">{page.sectiontitle}</p>
          </div>
          

          <ItemSlider items={page.client} sliderPerView={4} imgSizes={{w:310,h:88}} classes="pb-20 border-b"/>

        </Container>
        <Newsletter siteconfig={siteconfig} classes="pt-0 border-t-0"/>
        </>
      }
      
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const config = await getClient(preview).fetch(configQuery);
  const services = await getClient(preview).fetch(servicesQuery);
  return {
    props: {
      page: services,
      siteconfig: { ...config },
      preview
    },
    revalidate: 100
  };
}