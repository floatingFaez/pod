import { Fragment,useState } from "react";
import Image from "next/image";
import GetImage from "@utils/getImage";
import { getClient } from "@lib/sanity";
import { configQuery, fieldTripsQuery } from "@lib/groq";
import Container from "@components/container";
import When from "@components/when";
import Layout from "@components/layout";
import Marquee from "@components/ui/marquee";
import HeaderSection from "@components/sections/headerSection";
import BookingModal from "@components/modal/bookingModal";
import RewardBadge from "@components/ui/reward-badge";
import Tabs from "@components/tabs";
import Button from "@components/ui/button";
import TapeBorder from "@components/ui/tape-border";
import { PhotographIcon } from "@heroicons/react/outline";

export default function FieldTrips(props) {
  const { page, siteconfig, preview, preloadImage } = props;
  const {marquee_text,marquee_speed,marquee_tape_text} = siteconfig

  const [showBooking,setShowBooking] = useState(false)

  let imageProps = null

  if(!!page){
    imageProps = page?.mainImage ? GetImage(page.mainImage) : null;
  }

  const handleButtonClick = (index) =>{
    setShowBooking(index === 0)
  }
  

  return (
    <Layout {...siteconfig}>
      {!!page && 
        <Fragment>
          <HeaderSection title={page.subtitle} subtitle={page.title} classes="border-b txt-black theme-gray-bg"/>

          <Container className="full-width">
            <div className="banner bg-cover bg-center">
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
          </Container>
          
          <Container className="full-width border-t theme-gray-bg">
            <div className="mx-auto text-center section-desc max-w-screen-xl px-5">
              <p className="text-desc text-heading-2.5x txt-black">
                {page.body}
              </p>
            </div>
            <Marquee count={10} classes='border-t border-theme-black txt-black bg-white' speed={marquee_speed}>
              {marquee_text}
            </Marquee>
          </Container>
            
          <Tabs tabs={page.tabs} siteconfig={siteconfig}/>

          <Container className="full-width border-y theme-gray-bg ">
            <div className="grid grid-cols-1 md:grid-cols-2 text-white max-w-screen-xl mx-auto  px-5">
                {
                  page?.package?.map( (aPackage,i )=> {
                    let packageImg = aPackage?.pkgImage ? GetImage(aPackage.pkgImage) : null;
                    return (
                      <div className={`py-16 md:pt-20 md:pb-16 text-center md:border-r relative ${i === 0 ?'border-theme-black':'tap-parent inside discover'}`} key={`apck_#${i}`}>
                          <p className="text-heading-2.5x mb-5">{aPackage.title}</p>
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
                          <p className="mb-16 max-w-lg mx-auto fss-2 px-4 lg:px-5 md:px-9">{aPackage.description}</p>
                          <Button text={aPackage.buttonText} classes="border border-theme-black py-4 px-20 hover:bg-gray-100" handleClick={()=> handleButtonClick(i)}/>
                          <When condition={i===1}>
                            <RewardBadge type='bottom' classes='dreamers' boarding_hide={true} reward_Text='DREAMER REWARDS' />
                            <TapeBorder scrollText={marquee_tape_text} count={10} speed={marquee_speed}/>
                          </When>
                      </div>
                    )
                  })
                }
            </div>
          </Container>
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
