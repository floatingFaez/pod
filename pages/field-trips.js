import Container from "@components/container";
import Layout from "@components/layout";
import { configQuery, fieldTripsQuery } from "@lib/groq";
import { getClient } from "@lib/sanity";
import GetImage from "@utils/getImage";
import Subpagehero from "@components/sections/subpagehero";
import Tabs from "@components/tabs";
import Button from "@components/ui/button";
import Image from "next/image";
import Newsletter from "@components/newsletter";
import { PhotographIcon } from "@heroicons/react/outline";

export default function FieldTrips(props) {
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

          <Subpagehero title={page.bep_section_subtitle} subtitle={page.bep_sectiontitle} classes="border-t border-gray-400"/>

          <Tabs tabs={page.tabs}/>

          <div className={`py-5 border-b border-t border-gray-400 text-center`}>
              <p className="mt-2 text-lg text-white uppercase font-secondary">{page.sectiontitle}</p>
          </div>
          

          <div className="grid grid-cols-2 text-white border-b">
              {
                page?.package?.map( (aPackage,i )=> {
                  let packageImg = aPackage?.pkgImage ? GetImage(aPackage.pkgImage) : null;
                  return (
                    <div className={`pt-20 pb-16 text-center ${i === 0 ? 'border-r':''}`} key={`apck_#${i}`}>
                        <p className="text-3xl mb-5">{aPackage.title}</p>
                        <div className="package-thumb">
                          {
                            !!packageImg && 
                              <Image
                                src={packageImg.src}
                                loader={packageImg.loader}
                                blurDataURL={packageImg.blurDataURL}
                                alt={packageImg.alt || "Thumbnail"}
                                placeholder="blur"
                                layout="responsive"
                                width={'427px'}
                                height={'285px'}
                                priority={preloadImage ? true : false}
                                className="transition-all"
                              />
                          }
                          
                        </div>
                        <p className="mb-16 max-w-lg mx-auto">{aPackage.description}</p>
                        <Button text={aPackage.buttonText} />
                    </div>
                  )
                })
              }
          </div>

        </Container>
        <Newsletter siteconfig={siteconfig} classes="pt-0 border-t-0"/>
        </>
      }
      
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const config = await getClient(preview).fetch(configQuery);
  const fieldTrips = await getClient(preview).fetch(fieldTripsQuery);
  return {
    props: {
      page: fieldTrips,
      siteconfig: { ...config },
      preview
    },
    revalidate: 100
  };
}
